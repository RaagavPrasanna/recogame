# Search results algorithm

1. **BACKEND**: We should have an endpoint for the search field
    - Names of the games - `/api/all-games`
    - Accounts - `/api/all-accounts`
    - Etc
2. **FRONTEND**: We fetch from this endpoint and use it as datalist
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
3. Browser's matching algorithm for autosuggestions should be good enough

