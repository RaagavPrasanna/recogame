// import pathUrls from './igdb_urls.cjs';
const pathUrls = require('./igdb_urls.cjs')
// Used for documentation
// eslint-disable-next-line no-unused-vars
const types = require('./igdb_types.cjs')

const axios = require('axios');
require("dotenv").config();
const id = process.env.client_id;
const auth = process.env.Authorization;

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
      return info;
    })
    .catch(err => {
      console.log("something wrong fetchPath************");
      console.error(err);
    });
}

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
  const info = Object.values(response)
  if (info === undefined) {
    throw new Error(`Fetch was not successful for IGDB info for the app`)
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
  try {
        const info= (await fetchStoreInfo(pathUrls.searchById_fields(id)))[0];
        console.log(`      - For "${id}"`)
        console.log( info);
        return groupType(info);
       
      } catch (e) {
        console.error(`Could not fetch the game info with id "${id}"`)
        return null
      }
}
/**
 *regroup fetch data to GameInfo types
 *
 * @param {info} game info 
 * @returns {Promise<types.GameInfo>} GameInfo types.
 */
function groupType(info){
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
}
/**
 * Fetch the game info.
 *
 * @param {string} keyword of the game.
 * @returns {Promise<types.GameInfo>} Game info without the price.
 */

async function fetchGameInfoWord(keyword) {
  try {
    const data= await fetchStoreInfo(pathUrls.searchByKeyword_fields(keyword));
    console.log(`      - For "${keyword}"`)
    // console.log(data);
    return data.map(info=> groupType(info)     
   )
  } catch (e) {
    console.error(`Could not fetch the game info with keyword : "${keyword}"`)
    return null
  }
}

module.exports = {
  fetchAllIGDBApps,  
  fetchGameInfoId,
  fetchGameInfoWord
}
