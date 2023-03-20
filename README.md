# RecoGame service

Link: https://recogame-final.azurewebsites.net/

## Setup

1. Create a `.env` file in root directory
    ```bash
    # Mongo
    MONGO_CONNECTION_URI="mongodb+srv://<USERNAME>:<PASSWORD>..."

    # IGDB
    IGDB_ID="<CLIENT_ID>"
    IGDB_AUTH="<TOKEN_TYPE>_<ACCESS_TOKEN>"
    ```
2. Install all the dependencies
    ```bash
    npm install --prefix server
    npm install --prefix client
    ```
3. Run the server
    ```bash
    npm run start
    ```

## Utilities

### Game fetcher

#### How to run

- Running
    1. Ensure that your `.env` and dependencies are [set up correctly](#-setup)
    2. Run
        ```bash
            ./server/bin/fetch.js <<YOUR QUERY HERE>>
        ```
- Flags
    - Consult `--help` if needed
    - Supply the source of fetch with the first argument. Can be:
        - **`steam`** - Fetch from Steam API
        - **`idgb`** - Fetch from IGDB API
    - Supply the info you want to fetch
        - **`all`** - Fetch all games
        - **`info`** - Fetch info about a specific game
            - The game needs to be specified with an `--id` flag
            - `--name` flag is also avaiable for IGDB

#### What outputs

- Return code `0` and game JSON data
- Return code `1` and error message

### Java importer

#### How to run

- Running
    1. Ensure that your `.env` is [set up correctly](#-setup)
    2. Check the file `starting-games.json`. The file contains an array of game IDs that you want to fetch.
    3. Compile
        ```bash
        (cd db_java && mvn clean package)
        ```
    4. Run
    ```bash
        java -jar db_java/target/db_java-1.0.jar
    ```
