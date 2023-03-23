import { useState, useEffect } from 'react';
import Button from '../UI/Button/Button';

function PreferenceForm({ setUserPrefs, submitForm }) {

  const [allGames, setAllGames] = useState([]);
  const [playersSteamGames, setPlayersSteamGames] = useState([]);
  const [allPlatforms, setAllPlatforms] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allGenres, setAllGenres] = useState([]);

  const [allGamesInput, setAllGamesInput] = useState('');
  const [playersGamesInput, setPlayersGamesInput] = useState('');
  const [platformsInput, setPlatformsInput] = useState('');
  const [categoriesInput, setCategoriesInput] = useState('');
  const [genresInput, setGenresInput] = useState('');

  function allGamesHandler(e) {
    setAllGamesInput(e.target.value.toLowerCase());
  }

  function playersGamesHandler(e) {
    setPlayersGamesInput(e.target.value.toLowerCase());
  }

  function platformsHandler(e) {
    setPlatformsInput(e.target.value.toLowerCase());
  }

  function categoriesHandler(e) {
    setCategoriesInput(e.target.value.toLowerCase());
  }

  function genresHandler(e) {
    setGenresInput(e.target.value.toLowerCase());
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

    async function getPlatforms() {
      const response = await fetch('/api/game/platforms');
      const data = await response.json();
      setAllPlatforms([...data]);
    }

    async function getCategories() {
      const response = await fetch('/api/game/categories');
      const data = await response.json();
      setAllCategories([...data]);
    }

    async function getGenres() {
      const response = await fetch('/api/game/genres');
      const data = await response.json();
      setAllGenres([...data]);
    }

    getGames();
    getUsersGames();
    getPlatforms();
    getCategories();
    getGenres();
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

  const platformsFilteredData = allPlatforms.filter((platform) => {
    if(platformsInput === '') {
      return platform;
    } else {
      return platform.toLowerCase().includes(platformsInput);
    }
  });

  const categoriesFilteredData = allCategories.filter((category) => {
    if(categoriesInput === '') {
      return category;
    } else {
      return category.toLowerCase().includes(categoriesInput);
    }
  });

  const genresFilteredData = allGenres.filter((genre) => {
    if(genresInput === '') {
      return genre;
    } else {
      return genre.toLowerCase().includes(genresInput);
    }
  });

  const allGamesSearch = () => {
    return (
      <div>
        <input type="search" placeholder="Search Game" onChange={allGamesHandler} />
        <div>
          {allGamesFilteredData.map((game) => (
            <p key={game.id} onClick={() => {
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
            <p key={game.id} onClick={() => {
              console.log(`selected ${game.name}`);
            }}>
              {game.name}
            </p>
          ))}
        </div>
      </div>
    );
  };

  const platformsSearch = () => {
    return (
      <div>
        <input type="search" placeholder="Search Platform" onChange={platformsHandler} />
        <div>
          {platformsFilteredData.map((platform) => (
            <p key={platform} onClick={() => {
              console.log(`selected ${platform}`);
            }}>
              {platform}
            </p>
          ))}
        </div>
      </div>
    );
  };

  const categoriesSearch = () => {
    return (
      <div>
        <input type="search" placeholder="Search Category" onChange={categoriesHandler} />
        <div>
          {categoriesFilteredData.map((category) => (
            <p key={category} onClick={() => {
              console.log(`selected ${category}`);
            }}>
              {category}
            </p>
          ))}
        </div>
      </div>
    );
  };

  const genresSearch = () => {
    return (
      <div>
        <input type="search" placeholder="Search Genre" onChange={genresHandler} />
        <div>
          {genresFilteredData.map((genre) => (
            <p key={genre} onClick={() => {
              console.log(`selected ${genre}`);
            }}>
              {genre}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {playersGamesSearch()}
      {allGamesSearch()}
      {platformsSearch()}
      {categoriesSearch()}
      {genresSearch()}
      <Button onClick={submitForm}>Submit</Button>
    </div>
  );
}

export default PreferenceForm;