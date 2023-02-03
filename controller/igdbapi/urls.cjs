/** All the endpoints required for constructing the database. */
const pathsUrls = {
  /** List of all games. */
  allGames: new URL('https://api.steampowered.com/ISteamApps/GetAppList/v2'),
  /**
   * Info about a game from the store page.
   * @param {number} appId ID of the application.
   */
  storeInfo: (appId) => {
    const url = new URL('https://store.steampowered.com/api/appdetails')
    url.searchParams.set('appids', appId)
    url.searchParams.set('cc', 'us')
    return url
  }
}

module.exports = pathsUrls;
