/* eslint-disable camelcase */

/**
 * Minimal info about a steam app.
 */
// class App {
//   /** @type {number} ID. */
//   appid
//   /** @type {number} Title. */
//   name
// }


/**
 * Needed info about a steam game.
 */
class StoreInfo {
  /** @type {number} ID. */
  steam_appid
  /** @type {string} Title. */
  name
  /** @type {[string]} List of developers. */
  developers
  /** @type {[string]} List of publishers. */
  publishers
  /** @type {string} URL to the header image. */
  header_image
  /** @type {string} URL to the background image. */
  background_raw
  /** @type {[{id: number, description: string}]} List of categories. */
  categories
  /** @type {[{id: number, description: string}]} List of genres. */
  genres
  /** @type {string} Full description of an app. */
  detailed_description
  /** @type {string} Shortened description of an app. */
  short_description
  /** @type {string} all the supported languages */
  supported_languages
  /** @type {{ window: boolean, mac: boolean, linux: boolean}} oS system options*/
  platforms
  /** @type {{score: number, url: string}} List of metacritic */
  metacritic
  /** @type {[{id: number, path_thumbnail: string, path_full: string}]} List of screenshots */
  screenshots
  // eslint-disable-next-line max-len
  /** @type {[{id: number, name: string, thumbnail: string, webm: {480: string, max: string}, mp4: {480: string, max: string}, hightlight: boolean}]}  URL of moves*/
  movies
  /** @type {{total: number}}  total number of recommendations*/
  recommendations
  /** @type {string} URL to the background image*/
  background
  /** @type {{ids: [number, number], notes: string}} */
  content_descriptors
  
}


class GameInfo {
  /** @type {number} ID. */
  steamId
  /** @type {string} URL to buy the game. */
  storeUrl
  /** @type {string} Title. */
  name
  /** @type {[string]} List of developers. */
  developers
  /** @type {[string]} List of publishers. */
  publishers
  /** @type {string} URL to the header image. */
  imageHeader
  /** @type {string} URL to the background image. */
  imageBackground
  /** @type {[string]} List of categories. */
  categories
  /** @type {[string]} List of categories. */
  genres
  /** @type {Map<string, number>} Prices for the countries. */
  prices
  /** @type {string} Full description of an app. */
  detailedDescription
  /** @type {string} Shortened description of an app. */
  shortDescription
  /** @type {[string]} List of languages that the app is translated to. */
  supportedLanguages
  /** @type {[string]} List of compatable OS*/
  platforms
  /** @type {string} URL to metacritic */
  metacritic
  /** @type {[string]}  List of path_thumbnail of screenshots*/
  screenshots
  /** @type {[string]}  URL of moves in webm 480*/
  movies
  /** @type {number} total of recommendations */
  recommendations 
  /** @type {string} URL to background */
  background
  /** @type {string} notes of content_descriptors */
  content_descriptors
  
}

export { StoreInfo,  GameInfo } 
