/**
 * Minimal info about a steam app.
 */
class App {
  /** @type {number} ID. */
  appid
  /** @type {number} Title. */
  name
}


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
}


module.exports = {
  App,
  StoreInfo,
  GameInfo
}
