import { useState, useEffect } from 'react';

function PreferenceForm() {

  const [allGames, setAllGames] = useState([]);
  const [playersSteamGames, setPlayersSteamGames] = useState([]);

  useEffect(() => {
    async function getGames() {
      const response = await fetch('/api/games');
      const data = await response.json();
      setAllGames([...data]);
    }
    getGames();
  }, []);

  useEffect(() => {
    async function getGames() {
      const response = await fetch('/authentication/user-steam-games');
      const data = await response.json();
      setPlayersSteamGames([...data]);
    }
    getGames();
  }, []);



  return (
    <div>
      <input required type="search" list="all-games" id="games-query" name="games=query" />
      <datalist id="all-games">
        {
          allGames.map((game, key) => {
            return (
              <option value={game.name} key={key} onClick={() => {
                console.log('clicked all games option');
              }}/>
            );
          })
        }
      </datalist>
      <br/>
      <input required type="search" list="players-steam-games" id="steam-games-query" name="steam-games-query"/>
      <datalist id="players-steam-games">
        {
          playersSteamGames.map((game, key) => {
            return (
              <option value={game.name} key={key} onClick={() => {
                console.log('clicked players steam games option');
              }}/>
            );
          })
        }
      </datalist>
    </div>
  );
}

export default PreferenceForm;