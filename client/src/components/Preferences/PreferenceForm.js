import { useState, useEffect } from 'react';
import Button from '../UI/Button/Button';

function PreferenceForm({ setUserPrefs, submitForm }) {

  const [allGames, setAllGames] = useState([]);
  const [playersSteamGames, setPlayersSteamGames] = useState([]);

  const [allGamesInput, setAllGamesInput] = useState('');
  const [playersGamesInput, setPlayersGamesInput] = useState('');


  function allGamesHandler(e) {
    setAllGamesInput(e.target.value.toLowerCase());
  }

  function playersGamesHandler(e) {
    setPlayersGamesInput(e.target.value.toLowerCase());
  }

  useEffect(() => {
    async function getGames() {
      const response = await fetch('/api/game/list');
      const data = await response.json();
      setAllGames([...data]);
    }

    async function getUsersGames() {
      const response = await fetch('/authentication/user-steam-games');
      const data = await response.json();
      setPlayersSteamGames([...data]);
    }
    getGames();
    getUsersGames();
  }, []);


  const playersGamesFilteredData = playersSteamGames.filter((game) => {
    if(playersGamesInput === '') {
      return game;
    } else {
      return game.name.toLowerCase().includes(playersGamesInput);
    }
  });

  const allGamesFilteredData = allGames.filter((game) => {
    if(allGamesInput === '') {
      return game;
    } else {
      return game.name.toLowerCase().includes(allGamesInput);
    }
  });

  const allGamesSearch = () => {
    return (
      <div>
        <input type="search" placeholder="Search Game" onChange={allGamesHandler} />
        <div >
          {allGamesFilteredData.map((game) => (
            <p key={game.id} onKeyDown={(e) => {
              if(e.key === 'Enter') {
                console.log(`selected ${game.name}`);
              }
            }} onClick={() => {
              console.log(`selected ${game.name}`);
            }}>
              {game.name}
            </p>
          ))}
        </div>
      </div>
    );
  };

  const playersGamesSearch = () => {
    return (
      <div>
        <input type="search" placeholder="Search Game" onChange={playersGamesHandler} />
        <div >
          {playersGamesFilteredData.map((game) => (
            <p key={game.id} onKeyDown={(e) => {
              if(e.key === 'Enter') {
                console.log(`selected ${game.name}`);
              }
            }} onClick={() => {
              console.log(`selected ${game.name}`);
            }}>
              {game.name}
            </p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {playersGamesSearch()}
      {allGamesSearch()}
      <Button onClick={submitForm}>Submit</Button>
    </div>
  );
}

export default PreferenceForm;