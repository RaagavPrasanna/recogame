const pathUrls = require('./urls.cjs')
// Used for documentation
// eslint-disable-next-line no-unused-vars
const types = require('./types.cjs')



/**
 * Stop execution for some time.
 *
 * @param {number} seconds Duration to sleep.
 * @returns {Promise<void>} Promise to `await` to stop execution.
 */
async function sleep(seconds) {
  return new Promise((res) => setTimeout(res, seconds * 1000))
}


/**
 * Generate and resolve promises sequentially with delay.
 *
 * @template T Result of the promise.
 * @param {[() => Promise<T>]} promisesCallbacks Generators for promises to resolve.
 * @param {number} delay Delay between resolves (in seconds).
 * @returns {Promise<T[]>} Resolved promises.
 */
async function throttleResolve(promisesCallbacks, delay = 0) {
  const results = []
  for (const pc of promisesCallbacks) {
    results.push(await pc())
    await sleep(delay)
  }
  return results
}


/**
 * Split the array in the chunks of the same size (except the last one).
 *
 * @template T Element in the array.
 * @param {[T]} array Initial array
 * @param {number} chunkSize Number of elements per chunk.
 * @returns {[[T]]} Array of chunks.
 */
function chunkArray(array, chunkSize) {
  const final = []
  for (let i = 0; i < array.length; i += chunkSize) {
    final.push(array.slice(i, i + chunkSize))
  }
  return final
}


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
  return(await fetchJson(pathUrls.allGames))
  // return (await fetchJson(pathUrls.allGames))['applist']['apps']
  //   .filter(a => Boolean(a.name))
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
      detailed_description: info.detailed_description,
      short_description: info.short_description,
      supported_languages: info.supported_languages,
      platforms: info.platforms,
      // metacritic
      // categories
      // genres
      // screenshots
      // movies
      // recommendations
      // background
      // content_descriptors

    }
  } catch (e) {
    console.error(`Could not fetch the game info with id "${id}"`)
    return null
  }
}


// /**
//  * Fetch the prices for the list of apps in a given country.
//  *
//  * @param {[number]} ids IDs of the games.
//  * @param {string} countryCode 2 letter country code.
//  * @returns {Promise<Map<number, number?>>}
//  * Prices of the games id to price (`null` for not available, needs to be `/ 100`).
//  */
// async function fetchPricesForCountry(ids, countryCode) {
//   console.log(`      - For "${countryCode}"`)
//   if (ids.length > 10) {
//     throw new Error('Cannot get store prices for more than 10 games at a time')
//   } else {
//     const response = await fetchJson(pathUrls.storePrices(ids, countryCode))
//     const result = {}
//     for (const [id, info] of Object.entries(response)) {
//       if (!info['success']) {
//         result[id] = null
//       } else if (info['data'].length === 0) {
//         result[id] = 0
//       } else {
//         result[id] = info['data']['price_overview']['initial']
//       }
//     }
//     return result
//   }
// }


// /**
//  * Fetch the prices for the list of apps in given countries.
//  *
//  * @param {[number]} ids IDs of the games.
//  * @param {[string]} countryCodes 2 letter country codes.
//  * @param {number} delay Delay between fetches (in seconds).
//  * @return {Promise<Map<number, Map<string, number>>}
//  * Prices for the games for the countries (`null` for not available)
//  */
// async function fetchPricesForCountries(ids, countryCodes, delay = 0) {
//   const pricesForCountries = await throttleResolve(
//     countryCodes.map(
//       (c) => async () => await fetchPricesForCountry(ids, c)
//     ),
//     delay
//   )
//   const prices = {}
//   for (const id of ids) {
//     prices[id] = {}
//     for (const [i, countryCode] of countryCodes.entries()) {
//       const price = pricesForCountries[i][id]
//       prices[id][countryCode] = price !== null ? price / 100 : null
//     }
//   }
//   return prices
// }


// /**
//  * Fetch the info about the games along with their prices in a chunk.
//  * A chunk cannot exceed 10 ids.
//  *
//  * @param {[number] | number} ids IDs of the games.
//  * @param {[string] | string} countryCodes 2 letter country codes.
//  * @param {number} delay Delay between fetches (in seconds).
//  * @return {Promise<[types.GameInfo]>} Game infos with the price.
//  */
// async function fetchGamesChunk(ids, countryCodes, delay = 0) {
//   // Convert types
//   if (typeof ids === 'number') {
//     ids = [ids]
//   }
//   if (typeof countryCodes === 'string') {
//     countryCodes = [countryCodes]
//   }

//   console.log(`- Chunk "${ids.join(', ')}"`)
//   console.log('  - Fetching')
//   console.log('    - Info')
//   // Fetch apps and filter out the ones that aren't games
//   const gameInfos = (await throttleResolve(
//     ids.map(
//       (id) => async () => await fetchGameInfo(id)
//     ),
//     delay
//   )).filter(i => i !== null)

//   if (gameInfos.length === 0) {
//     return []
//   }

//   await sleep(delay)

//   console.log('    - Prices')
//   // Fetch and add prices
//   const prices = await fetchPricesForCountries(ids, countryCodes, delay)
//   for (const game of gameInfos) {
//     game.prices = prices[game.steamId]
//   }

//   return gameInfos
// }



module.exports = {
  fetchAllSteamApps,  
  // fetchGamesChunk,
  fetchGameInfo

  // chunkArray
}
