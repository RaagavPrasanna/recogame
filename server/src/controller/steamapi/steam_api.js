import pathsUrls from './steam_urls.js';
// eslint-disable-next-line no-unused-vars
import types from './steam_types.js';
import igdb from '../igdbapi/igdb_api.js';

/**
 * Request an API and return JSON data from it.
 *
 * @param {URL} url URL to the API.
 * @returns {Promise<object>} JSON data from the API.
 */
async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not get the response from ${url} - ${response.status}`);
  }
  return await response.json();
}

/**
 * Fetch the list of apps on steam.
 *
 * @returns {Promise<[types.App]>} Apps.
 */
async function fetchAllSteamApps() {
  return (await fetchJson(pathsUrls.allGames))['applist']['apps']
    .filter(a => Boolean(a.name));
}

/**
 * Fetch the store info about the app.
 *
 * @param {number} id ID of the game.
 * @returns {Promise<types.StoreInfo>} Store info.
 */
async function fetchStoreInfo(id) {
  const response = await fetchJson(pathsUrls.storeInfo(id));
  const info = Object.values(response)[0];
  if (!info['success']) {
    throw new Error(`Fetch was not successful for steam info for the app ${id}`);
  } else if (info['data']['type'] !== 'game') {
    throw new Error(`App ${id} is not a game.`);
  } else {
    return info['data'];
  }
}

/**
 * Fetch the game info.
 *
 * @param {number} id ID of the game.
 * @returns {Promise<types.GameInfo>} Game info without the price.
 */
async function fetchGameType(id) {
  const info = await fetchStoreInfo(id);
  return {
    sourceId:
      info.steam_appid,
    sourceName:
      'steam',
    name:
      info.name,
    developers:
      info.developers,
    publishers:
      info.publishers,
    imageHeader:
      info.header_image || null,
    imageBackground:
      info.background_raw || null,
    categories:
      info.categories !== undefined
        ? info.categories.map(c => c.description)
        : null,
    genres:
      info.genres !== undefined
        ? info.genres.map(c => c.description)
        : null,
    storeUrl:
      `https://store.steampowered.com/app/${info.steam_appid}`,
    detailedDescription:
      info.detailed_description || null,
    shortDescription:
      info.short_description || null,
    supportedLanguages:
      info.supported_languages !== undefined
        ? info.supported_languages.split(', ')
        : null,
    platforms:
      info.platforms !== undefined
        ? Object.keys(info.platforms).filter(os => info.platforms[os])
        : null,
    metacritic:
      info.metacritic !== undefined
        ? info.metacritic.url
        : null,
    screenshots:
      (info.screenshots || []).map(c => c.path_thumbnail),
    movies:
      info.moves !== undefined
        ? info.movies.map(c => c.webm[480])
        : null,
    recommendations:
      info.recommendations !== undefined
        ? info.recommendations.total
        : null,
    background:
      info.background || null,
    contentDescriptors:
      info.content_descriptors !== undefined
        ? info.content_descriptors.notes
        : null
  };
}

/**
 * fetch a game information with merged platform from steam and igdb
 * @param {number} id of a game
 * @returns {Promise<types.GameInfo>} Game details
 */
async function fetchGameInfo(id){
  let steamGame = await fetchGameType(id);
  let igdbId = await igdb.fetchGameInfoId(id);
  if ( steamGame !== null &&
        ( steamGame.name ).toLowerCase() === ( igdbId.name ).toLowerCase()){
    steamGame.platforms = merge2Platforms(igdbId.platforms, steamGame.platforms);
    return steamGame;
  } else if ( steamGame !== null ){
    let igdbName = await igdb.fetchGameInfoName( steamGame.name );
    steamGame.platforms =
      merge2Platforms( igdbName.platforms, steamGame.platforms);
    console.log( 'elseif:' + steamGame.platforms);
    return steamGame;
  } else {
    console.error('error on merging platforms of IGDB and Steam');
    return null;
  }
}

/**
 * Merge 2 array of strings
 * @param {array of string} IGDB game platforms
 * @param {array of string} steam game platforms
 * @returns array of string merged
 */
function merge2Platforms(igdbArr, steamArr){
  let igdbPlateforms = igdbArr.map((ip)=>
    ip === 'PC (Microsoft Windows)' ? 'windows' : ip.toLowerCase());
  // merger 2 array of string with no dupulication
  let platforms = [...new Set(igdbPlateforms.concat(steamArr))];
  return platforms;
}

export default { fetchAllSteamApps, fetchGameInfo };
