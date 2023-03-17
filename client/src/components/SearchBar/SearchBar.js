import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './SearchBar.module.css';

function SearchBar() {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState('');
  const [allGames, setAllGames] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };


  async function getGames() {
    const resp = await fetch('/api/game/list');
    if (!resp.ok) {
      throw new Error(`Could not fetch list (${resp.status})`);
    }
    const data = await resp.json();
    setAllGames(data);
  }

  return (
    <div className={styles.search}>
      <input type='search' placeholder={t('Search')} onChange={ handleChange } />
      {
        allGames.filter(game => {
          if (searchInput === '') {
            return game;
          } else{
            return game.gameName.toLowerCase().includes(searchInput.toLowerCase());

          }
        }).map((game, index) => {
          <div key={index}>
            <p>{game.gameName}</p>
          </div>;
        })
      }
    </div>
  );
}

export default SearchBar;