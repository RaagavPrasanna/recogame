/** All the endpoints required for constructing the database. 
 *  URL info from https://api-docs.igdb.com/#getting-started
*/
const pathsUrls = {
  /** List of all games. */
  allGames: new URL('https://api.igdb.com/v4/games'),

  allGames_fields : "fields id, name ; ",
  /**
   * search games by keyword
   * 
   * @param {string} search games keyword
   * @returns games info
   */
  searchByName_fields : (keyword) => { 
    data = `fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots.*,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites; search "${keyword}";`
        return data;
  },

  /**
   * 
   * @param {number} search game by id
   * @returns game info
   */
  searchById_fields : (id) => { 
    data = `fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots.*,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites; where id=${id};`
        return data;
  }
}

module.exports = pathsUrls;
