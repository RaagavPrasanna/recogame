const pathUrls = require('./urls.cjs')
// Used for documentation
// eslint-disable-next-line no-unused-vars
const types = require('./types.cjs')


/**
 * Request an API and return JSON data from it.
 *
 * @param {URL} url URL to the API.
 * @returns {Promise<object>} JSON data from the API.
 */
async function fetchJson(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Could not get the response from ${url} - ${response.status}`)
  }
  return await response.json()
}


/**
 * Fetch the list of apps on steam.
 *
 * @returns {Promise<[types.App]>} Apps.
 */
async function fetchAllSteamApps() {
  // return(await fetchJson(pathUrls.allGames))
  return (await fetchJson(pathUrls.allGames))['applist']['apps']
    .filter(a => Boolean(a.name))
}


/**
 * Fetch the store info about the app.
 *
 * @param {number} id ID of the game.
 * @returns {Promise<types.StoreInfo>} Store info.
 */
async function fetchStoreInfo(id) {
  const response = await fetchJson(pathUrls.storeInfo(id))
  const info = Object.values(response)[0]
  if (!info['success']) {
    throw new Error(`Fetch was not successful for steam info for the app ${id}`)
  } else if (info['data']['type'] !== 'game') {
    throw new Error(`App ${id} is not a game.`)
  } else {
    return info['data']
  }
}

/**
 * Fetch the game info.
 *
 * @param {number} id ID of the game.
 * @returns {Promise<types.GameInfo>} Game info without the price.
 */
async function fetchGameInfo(id) {
  try {
    const info = await fetchStoreInfo(id)
    console.log(`      - For "${id}"`)
    return {
      steamId: info.steam_appid,
      name: info.name,
      developers: info.developers,
      publishers: info.publishers,
      imageHeader: info.header_image,
      imageBackground: info.background_raw,
      categories: info.categories.map(c => c.description),
      genres: info.genres.map(c => c.description),
      storeUrl: `https://store.steampowered.com/app/${info.steam_appid}`,
      prices: null, 
      required_age: info.required_age,      
      detailedDescription: info.detailed_description,
      shortDescription: info.short_description,
      supportedLanguages: info.supported_languages.split(", "),
      platforms: Object.entries(info.platforms).filter(([key,value])=> value ===true).map(([key, value])=>key), 
      // metacritic: info.metacritic.url,      
      screenshots: info.screenshots.map(c => c.path_thumbnail),
      movies: info.movies.map(c=> c.webm[480]) ,
      // recommendations: info.recommendations.total,
      background: info.background,
      content_descriptors: info.content_descriptors.notes
    }
  } catch (e) {
    console.error(`Could not fetch the game info with id "${id}"`)
    return null
  }
}




module.exports = {
  fetchAllSteamApps,  
  fetchGameInfo
}
