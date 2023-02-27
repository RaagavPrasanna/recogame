/* eslint-disable camelcase */

/**
 * Needed info about a IGDB game.
 */
class StoreInfo {
  /** @type {number} ID. */
  id;
  /** @type {string} Title. */
  name;
  // eslint-disable-next-line max-len
  /** @type {[{id:number, company :{id:number, name:string}, developer:boolean, publisher: boolean}]} List of developers and publisher. */
  involved_companies;
  // /** @type {[string]} List of publishers. */
  // publishers
  /** @type {{id: number, url: string}} URL to the header image. */
  cover;
  /** @type {undefined} URL to the background image. */
  background_raw;
  /** @type {[{id: number, name: string}]} List of categories/game_modes. */
  game_modes;
  /** @type {[{id: number, name: string}]} List of genres. */
  genres;
  /** @type {string} url of the game in IGDB */
  url;
  /** @type {string} Full description of an app. */
  summary;
  /** @type {undefined} A url-safe, unique, lower-case version of the name*/
  slug;
  // eslint-disable-next-line max-len
  /** @type {[{id: number, language:{id: number, native_name: string}}]]} all the supported languages */
  language_supports;
  /** @type {[{id: number, name: string}]} all system options*/
  platforms;
  /** @type {undefined} List of metacritic */
  metacritic;
  /** @type {[{id: number, url: string}]} List of screenshots in thumb size 90x90 */
  screenshots;
  /** @type {[{id: number, trusted: boolean, url: string}]}  URL of movies*/
  websites;
  /** @type {number}  total number of recommendations*/
  aggregated_rating_count;
  /** @type {undefined} URL to the background image*/
  background;
  /** @type {undefined} */
  content_descriptors;
}


class GameInfo {
  /** @type {number} ID. */
  steamId;
  /** @type {string} URL to buy the game. */
  storeUrl;
  /** @type {string} Title. */
  name;
  /** @type {[string]} List of developers. */
  developers;
  /** @type {[string]} List of publishers. */
  publishers;
  /** @type {string} URL to the header image. */
  imageHeader;
  /** @type {string} URL to the background image. */
  imageBackground;
  /** @type {[string]} List of categories. */
  categories;
  /** @type {[string]} List of categories. */
  genres;
  /** @type {Map<string, number>} Prices for the countries. */
  prices;
  /** @type {string} Full description of an app. */
  detailedDescription;
  /** @type {string} Shortened description of an app. */
  shortDescription;
  /** @type {[string]} List of languages that the app is translated to. */
  supportedLanguages;
  /** @type {[string]} List of compatable OS*/
  platforms;
  /** @type {string} URL to metacritic */
  metacritic;
  /** @type {[string]}  List of path_thumbnail of screenshots*/
  screenshots;
  /** @type {[string]}  URL of moves in webm 480*/
  movies;
  /** @type {number} total of recommendations */
  recommendations;
  /** @type {string} URL to background */
  background;
  /** @type {string} notes of content_descriptors */
  content_descriptors;
}

export default { StoreInfo, GameInfo };
