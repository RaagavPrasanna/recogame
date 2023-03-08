# Search results

1. **BACKEND**: Have an endpoint for the search field
    - Names of the games - `/api/game-all`
    - Accounts - `/api/all-accounts`
    - *etc*
2. **FRONTEND**: Fetch from this endpoint and use it as datalist
    - Fetch
        ```javascript
        const allGames = await fetch('/api/game-all');
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

# Home page results

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
3. **FRONTEND**: Fetch from this endpoint and display as tiles/list

# Rating system

- Aspects we can rate a game on
    - Current players (for multiplayer)
    - User reviews
        - **Gameplay** - controls, level design, feel
        - **Narrative** - story, context
        - **Graphics** - fidelity, aesthetics
        - **Technical** - performance, bugs
        - **Audio** - fidelity, acting
        - **Marketing** - target audience, expectations based on previous entries/competitors, controversies
        - **Social** - community, multiplayer
        - **Value** - balance game/cost
    - Thumbs up/down
    - Recommendations from Steam
- These aspects can be [weighted](https://www.gamesindustry.biz/what-drives-a-review-score) and summed up to give a single score
- Popular/niche score

# Game recommendation

- Aspects we can recommend a game on
    - [Game rating](#rating-system)
    - User preference
        - Genres
        - Keywords
        - Review aspects
        - Platforms/OS
        - Popular/niche
    - User library
        - Genres
        - Keywords
    - User wishlist
        - Genres
        - Keywords
    - Games from users with similar preferences

# Friend recommendation

- Aspects we can recommend a friend on
    - User preference
        - Genres
        - Keywords
        - Review aspects
        - Platforms/OS
        - Popular/niche
    - User library
        - Genres
        - Keywords
        - Specific games
    - "Openness" to be recommended

