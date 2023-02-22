# Search results algorithm

1. **BACKEND**: Have an endpoint for the search field
    - Names of the games - `/api/all-games`
    - Accounts - `/api/all-accounts`
    - *etc*
2. **FRONTEND**: Fetch from this endpoint and use it as datalist
    - Fetch
        ```javascript
        const allGames = await fetch('/api/all-games');
        ```
    - Add to datalist helper
        ```javascript
        /**
         * Insert entries from list of data into a datalist element.
         * @param {HTMLDataListElement} element Data list to insert entries to.
         * @param {string[]} datalist Entries to populate datalist with.
         */
        function populateDatalistWithElements(element, datalist) {
          for (const entry of datalist) {
            // Create option
            const option = document.createElement('option');
            option.textContent = entry;
            // Add it to the data list
            element.append(option);
          }
        }
        ```
    - Add to datalist
        ```javascript
        populateDatalistWithElements(
            document.querySelector('#datalist'),
            allGames.map((g) => g.appid)
        );
        ```
3. Browser's matching algorithm for auto suggestions should be good enough

# Home page results algorithm

1. **BACKEND**: Have a view with information only relevant for entry on the home page
    - Game - `id, shortDescription, image` + `rating` + *etc*
    - Account - `id, description, image`
2. **BACKEND**: Have an endpoint for fetching from this view
    - Sorting
        - `type`
            - Name
            - Release Date
            - Rating
            - *etc*
    - Pagination
        - `firstId`
            - ID from which start returning entries
        - `skipFirstId`
            - Whether to include first ID
            - Because client only knows about last ID it fetched, this ID can be passed as `firstId` and `skipFirstId`
        - `count`
            - Number of entries to fetch
3. **FRONTEND**: Fetch from this endpoint and display as tiles / list

