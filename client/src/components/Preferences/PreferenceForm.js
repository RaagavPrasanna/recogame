import { useState, useEffect, useContext } from 'react';
import UserContext from '../../store/user-context';
import Button from '../UI/Button/Button';
import { useTranslation } from 'react-i18next';

function PreferenceForm({ userPrefs, setUserPrefs, submitForm }) {

  const { user } = useContext(UserContext);
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

  const [playedGames, setPlayedGames] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState([]);
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation();

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

  async function getData(endpoint, setFunc) {
    const response = await fetch(endpoint);
    const data = await response.json();
    setFunc([...data]);
  }

  useEffect(() => {
    getData('/api/game/list', setAllGames);
    getData('/api/game/platforms', setAllPlatforms);
    getData('/api/game/categories', setAllCategories);
    getData('/api/game/genres', setAllGenres);
    if(user.provider === 'steam') {
      getData('/authentication/user-steam-games', setPlayersSteamGames);
    }
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

  const addGame = (game) => {
    const allGamesInd = allGames.findIndex((g) => g.name === game.name);
    const steamGamesInd = playersSteamGames.findIndex((g) => g.name === game.name);
    const notInAllGames = allGamesInd === -1;
    if(!notInAllGames) {
      const gameCopy = [...allGames];
      const gameToAdd = gameCopy.splice(allGamesInd, 1)[0];
      setAllGames(gameCopy);
      const tempPlayedGames = [...playedGames];
      tempPlayedGames.push(gameToAdd);
      setPlayedGames([...tempPlayedGames]);
      const userCopy = { ...userPrefs };
      userCopy.playedGames = [...tempPlayedGames];
      setUserPrefs(userCopy);
    }
    if(steamGamesInd !== -1 && notInAllGames) {
      const gameCopy = [...playersSteamGames];
      const gameToAdd = gameCopy.splice(steamGamesInd, 1)[0];
      setPlayersSteamGames(gameCopy);
      const tempPlayedGames = [...playedGames];
      tempPlayedGames.push(gameToAdd);
      setPlayedGames([...tempPlayedGames]);
      const userCopy = { ...userPrefs };
      userCopy.playedGames = [...tempPlayedGames];
      setUserPrefs(userCopy);
    } else if(steamGamesInd !== -1) {
      const gameCopy = [...playersSteamGames];
      gameCopy.splice(steamGamesInd, 1);
      setPlayersSteamGames(gameCopy);
    }
  };

  const removeGame = (game) => {
    const playedGamesInd = playedGames.findIndex((g) => g.name === game.name);
    const gameCopy = [...playedGames];
    const gameToAdd = gameCopy.splice(playedGamesInd, 1)[0];
    setPlayedGames(gameCopy);
    const userCopy = { ...userPrefs };
    userCopy.playedGames = [...gameCopy];
    setUserPrefs(userCopy);
    const tempAllGames = [...allGames];
    tempAllGames.push(gameToAdd);
    setAllGames([...tempAllGames]);
  };

  const addPlatform = (platform) => {
    const platformCopy = [...platforms];
    const allPlatformsCopy = [...allPlatforms];
    const platformInd = allPlatformsCopy.findIndex((p) => p === platform);
    allPlatformsCopy.splice(platformInd, 1);
    platformCopy.push(platform);
    setAllPlatforms(allPlatformsCopy);
    setPlatforms(platformCopy);
    const userCopy = { ...userPrefs };
    userCopy.platforms = [...platformCopy];
    setUserPrefs(userCopy);
  };

  const removePlatform = (platform) => {
    const platformCopy = [...platforms];
    const platformInd = platformCopy.findIndex((p) => p === platform);
    platformCopy.splice(platformInd, 1);
    const tempAllPlatforms = [...allPlatforms];
    tempAllPlatforms.push(platform);
    setAllPlatforms([...tempAllPlatforms]);
    setPlatforms(platformCopy);
    const userCopy = { ...userPrefs };
    userCopy.platforms = [...platformCopy];
    setUserPrefs(userCopy);
  };

  const addGenre = (genre) => {
    const genreCopy = [...genres];
    const allGenresCopy = [...allGenres];
    const genreInd = allGenresCopy.findIndex((g) => g === genre);
    allGenresCopy.splice(genreInd, 1);
    genreCopy.push(genre);
    setAllGenres(allGenresCopy);
    setGenres(genreCopy);
    const userCopy = { ...userPrefs };
    userCopy.genres = [...genreCopy];
    setUserPrefs(userCopy);
  };

  const removeGenre = (genre) => {
    const genreCopy = [...genres];
    const genreInd = genreCopy.findIndex((g) => g === genre);
    genreCopy.splice(genreInd, 1);
    const tempAllGenres = [...allGenres];
    tempAllGenres.push(genre);
    setAllGenres([...tempAllGenres]);
    setGenres(genreCopy);
    const userCopy = { ...userPrefs };
    userCopy.genres = [...genreCopy];
    setUserPrefs(userCopy);
  };

  const addCategory = (category) => {
    const categoryCopy = [...categories];
    const allCategoriesCopy = [...allCategories];
    const categoryInd = allCategoriesCopy.findIndex((c) => c === category);
    allCategoriesCopy.splice(categoryInd, 1);
    categoryCopy.push(category);
    setAllCategories(allCategoriesCopy);
    setCategories(categoryCopy);
    const userCopy = { ...userPrefs };
    userCopy.categories = [...categoryCopy];
    setUserPrefs(userCopy);
  };

  const removeCategory = (category) => {
    const categoryCopy = [...categories];
    const categoryInd = categoryCopy.findIndex((c) => c === category);
    categoryCopy.splice(categoryInd, 1);
    const tempAllCategories = [...allCategories];
    tempAllCategories.push(category);
    setAllCategories([...tempAllCategories]);
    setCategories(categoryCopy);
    const userCopy = { ...userPrefs };
    userCopy.categories = [...categoryCopy];
    setUserPrefs(userCopy);
  };

  const allGamesSearch = () => {
    return (
      <article>
        <h2>{t('Select Games')}</h2>
        <input type="search" placeholder={t('Search Game')} onChange={allGamesHandler} />
        {allGamesFilteredData.splice(0, 20).map((game) => (
          <p key={game.id} onClick={() => {
            addGame(game);
          }}>
            {game.name}
          </p>
        ))}
      </article>
    );
  };

  const playersGamesSearch = () => {
    return (
      <article>
        <h2>{t('Auto Imported Games')}</h2>
        <input type="search" placeholder={t('Search Game')} onChange={playersGamesHandler} />
        {playersGamesFilteredData.map((game) => (
          <p key={game.id} onClick={() => {
            addGame(game);
          }}>
            {game.name}
          </p>
        ))}
      </article>
    );
  };

  const platformsSearch = () => {
    return (
      <article>
        <h2>{t('Select Platforms')}</h2>
        <input type="search" placeholder={t('Search Platform')} onChange={platformsHandler} />
        <div>
          {platformsFilteredData.splice(0, 20).map((platform) => (
            <p key={platform} onClick={() => {
              addPlatform(platform);
            }}>
              {platform}
            </p>
          ))}
        </div>
      </article>
    );
  };

  const categoriesSearch = () => {
    return (
      <article>
        <h2>{t('Select Categories')}</h2>
        <input type="search" placeholder={t('Search Category')} onChange={categoriesHandler} />
        <div>
          {categoriesFilteredData.splice(0, 20).map((category) => (
            <p key={category} onClick={() => {
              addCategory(category);
            }}>
              {category}
            </p>
          ))}
        </div>
      </article>
    );
  };

  const genresSearch = () => {
    return (
      <article>
        <h2>{t('Select Genres')}</h2>
        <input type="search" placeholder={t('Search Genre')} onChange={genresHandler} />
        <div>
          {genresFilteredData.map((genre) => (
            <p key={genre} onClick={() => {
              addGenre(genre);
            }}>
              {genre}
            </p>
          ))}
        </div>
      </article>
    );
  };

  const listPlayedGames = () => {
    return (
      <article>
        <h2>{t('Played Games')}</h2>
        {playedGames.map((game, ind) => {
          return (
            <p key={ind} onClick={() => {
              removeGame(game);
            }}>{game.name}</p>
          );
        })}
      </article>
    );
  };

  const listPlatforms = () => {
    return (
      <article>
        <h2>{t('Platforms')}</h2>
        {platforms.map((platform, ind) => {
          return (
            <p key={ind} onClick={() => {
              removePlatform(platform);
            }}>{platform}</p>
          );
        })}
      </article>
    );
  };

  const listGenres = () => {
    return (
      <article>
        <h2>{t('Genres')}</h2>
        {genres.map((genre, ind) => {
          return (
            <p key={ind} onClick={() => {
              removeGenre(genre);
            }}>{genre}</p>
          );
        }
        )}
      </article>
    );
  };

  const listCategories = () => {
    return (
      <article>
        <h2>{t('Categories')}</h2>
        {categories.map((category, ind) => {
          return (
            <p key={ind} onClick={() => {
              removeCategory(category);
            }}>{category}</p>
          );
        }
        )}
      </article>
    );
  };

  return (
    <div>
      {playersGamesSearch()}
      {allGamesSearch()}
      {platformsSearch()}
      {categoriesSearch()}
      {genresSearch()}
      {listPlayedGames()}
      {listPlatforms()}
      {listGenres()}
      {listCategories()}
      <div>
        <Button onClick={submitForm}>{t('Submit')}</Button>
      </div>
    </div>
  );
}

export default PreferenceForm;