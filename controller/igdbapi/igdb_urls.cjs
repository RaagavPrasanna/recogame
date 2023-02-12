/** All the endpoints required for constructing the database. 
 *  URL info from https://api-docs.igdb.com/#getting-started
*/
const fields = "	fields id, name,involved_companies.company.name, involved_companies.publisher, involved_companies.developer,cover.url,game_modes.name,genres.name, summary,slug,language_supports.language.native_name,platforms.name, screenshots.url, websites.url, websites.trusted,aggregated_rating,aggregated_rating_count;"
const pathsUrls = {
  /** List of all games fore the. */
  allGames: new URL('https://api.igdb.com/v4/games'),

  allGames_fields : "fields id, name ; limit 10;",
  /**
   * search games by keyword
   * 
   * @param {string} search games keyword
   * @returns games info
   */
  searchByKeyword_fields : (keyword) => { 
        data = `${fields} search "${keyword}";`
        return data;
  },

  /**
   * 
   * @param {number} search game by id
   * @returns game info
   */
  searchById_fields : (id) => { 
    data = `${fields} where id=${id};`
        return data;
  }
}

module.exports = pathsUrls;
