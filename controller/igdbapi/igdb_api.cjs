const pathUrls = require('./igdb_urls.cjs')
// Used for documentation
// eslint-disable-next-line no-unused-vars
const types = require('./igdb_types.cjs')

const axios = require('axios');
require("dotenv").config();
const id = process.env.client_id;
const auth = process.env.Authorization;
// /**
//  * Request an API and return JSON data from it.
//  *
//  * @param {URL} url URL to the API.
//  * @returns {Promise<object>} JSON data from the API.
//  */
// async function fetchJson(url) {
//   const response = await fetch(url)
//   if (!response.ok) {
//     throw new Error(`Could not get the response from ${url} - ${response.status}`)
//   }
//   return await response.json()
// }



function fetchPath(data_field) { 
 return axios({
    url: pathUrls.allGames.href,    
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Client-ID': id,
        'Authorization': auth,
    },
    data: data_field,
  })
    .then(response => {
        let info = response.data;
      // get the data from other function
      return info;
        // return sendData(info);      
    })
    .catch(err => {
      console.log("something wrong fetchPath************");
      console.error(err);
    });
}

// /**
//  * storage data from fetch with axios
//  * @param {data} info 
//  * @returns info
//  */
// function sendData(info){
//   // console.log(info);
//   return info;
// }

/**
 * Fetch the list of apps on IGDB .
 *
 * @returns {Promise<[types.App]>} Apps.
 */
async function fetchAllIGDBApps(){
  let data = [];
  await fetchPath(pathUrls.allGames_fields).then(info=> data = info);
  console.log(data);
  return data ; 
}
/**
 * Fetch the store info about the app.
 *
 * @param {string} pathUrl for the game.either search path by Id or earch path by keyword.
 * @returns {Promise<types.StoreInfo>} Store info.
 */
async function fetchStoreInfo(urlPath) {
  const response = await fetchPath(urlPath)
  const info = Object.values(response)[0]
  if (info === undefined) {
    throw new Error(`Fetch was not successful for IGDB info for the app`)
  // } else if (info['data']['type'] !== 'game') {
  //   throw new Error(`App ${id} is not a game.`)
  } else {
    return info
  }
}
 /**
//  * Fetch the game info.
//  *
//  * @param {number} id ID of the game.
//  * @returns {Promise<types.GameInfo>} Game info without the price.
//  */
async function fetchGameInfoId(id) {
  // let data = await fetchPath(pathUrls.searchById_fields(id));
  // console.log(data);
  // return data;
  try {
        const info= await fetchStoreInfo(pathUrls.searchById_fields(id));
        console.log(`      - For "${id}"`)
        console.log( info);

        return {
          id: info.id,
          name: info.name,
          developers: info.involved_companies!==undefined? info.involved_companies.filter(c=>c.developer==true).map(c=>c.company.name):null,
          publishers: info.involved_companies!==undefined? info.involved_companies.filter(c=>c.publisher==true).map(c=>c.company.name):null,
          imageHeader: info.cover !== undefined? info.cover.url : null,
          imageBackground: null,
          categories: (info.game_modes !== undefined )? info.game_modes.map(c => c.name): null,
          genres: (info.genres !== undefined ) ? info.genres.map(c => c.name) : null,
          storeUrl: info.url,
          prices: null, 
          required_age: null,      
          detailedDescription: info.summary || null,
          shortDescription: info.slug || null,
          supportedLanguages:(info.language_supports !== undefined ) ? info.language_supports.map(c=>c.language.native_name) : null,
          platforms: (info.platforms !== undefined )? info.platforms.map(c=>c.name): null, 
          metacritic: null,      
          screenshots: (info.screenshots || []).map(c => c.url),
          movies: (info.websites !== undefined) ? info.websites.filter(c=>c.trusted===true).map(c=> c.url) : null,
          recommendations: info.aggregated_rating_count || null,
          background: null,
          content_descriptors:null
        }
      } catch (e) {
        console.error(`Could not fetch the game info with id "${id}"`)
        return null
      }
}

async function fetchGameInfoWord(keyword) {
  let data = await fetchPath(pathUrls.searchByKeyword_fields(keyword));
  console.log(data);
  return data;
}


// /**
//  * Fetch the game info.
//  *
//  * @param {number} id ID of the game.
//  * @returns {Promise<types.GameInfo>} Game info without the price.
//  */
// async function fetchGameInfo(id) {
//   try {
//     const info = await fetchStoreInfo(id)
//     console.log(`      - For "${id}"`)
//     return {
//       steamId: info.steam_appid,
//       name: info.name,
//       developers: info.developers,
//       publishers: info.publishers,
//       imageHeader: info.header_image,
//       imageBackground: info.background_raw,
//       categories: info.categories.map(c => c.description),
//       genres: info.genres.map(c => c.description),
//       storeUrl: `https://store.steampowered.com/app/${info.steam_appid}`,
//       prices: null, 
//       required_age: info.required_age,      
//       detailedDescription: info.detailed_description,
//       shortDescription: info.short_description,
//       supportedLanguages: info.supported_languages.split(", "),
//       platforms: Object.entries(info.platforms).filter(([key,value])=> value ===true).map(([key, value])=>key), 
//       // metacritic: info.metacritic.url,      
//       screenshots: info.screenshots.map(c => c.path_thumbnail),
//       movies: info.movies.map(c=> c.webm[480]) ,
//       // recommendations: info.recommendations.total,
//       background: info.background,
//       content_descriptors: info.content_descriptors.notes
//     }
//   } catch (e) {
//     console.error(`Could not fetch the game info with id "${id}"`)
//     return null
//   }
// }




module.exports = {
  fetchAllIGDBApps,  
  fetchGameInfoId,
  fetchGameInfoWord
}
