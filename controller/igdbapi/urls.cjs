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
  // ,
  // /**
  //  * Prices from the store page.
  //  * @param {[number]} appIds IDs of the applications.
  //  * @param {string} countryCode 2 letter code of the country.
  //  */
  // storePrices: (appIds, countryCode) => {
  //   const url = new URL('https://store.steampowered.com/api/appdetails')
  //   url.searchParams.set('appids', appIds.join(','))
  //   url.searchParams.set('cc', countryCode)
  //   url.searchParams.set('filters', 'price_overview')
  //   return url
  // }
}

module.exports = pathsUrls;
