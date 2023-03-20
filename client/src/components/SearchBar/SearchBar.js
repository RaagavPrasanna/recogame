<<<<<<< HEAD
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
=======
import { useState, useEffect } from 'react';
import styles from './SearchBar.module.css';
import Modal from '../UI/Modal/Modal';

function SearchBar({ onCancel }) {
  const [userInput, setUserInput] = useState('');
  const [dataJson, setDataJson] = useState('');

  function inputHandler(e) {
    setUserInput(e.target.value.toLowerCase());
  }

  async function fetchGames() {
    const response = await fetch('/api/game/list');
    if (!response.ok) {
      throw new Error(`Could not fetch game (${response.status})`);
    }
    const data = await response.json();
    setDataJson(data);
  }

  useEffect(() => {
    fetchGames();
  }, []);

  // const filteredData = dataJson.filter((game) => {
  //   if (userInput === '') {
  //     return game;
  //   } else {
  //     return game.name.toLowerCase().includes(userInput);
  //   }
  // });


  return (
    <Modal className={styles.search} onClick={onCancel}>
      <input type="search" placeholder="Search Game" onChange={inputHandler} />
      {/* <div>
        {filteredData.map((game) => (
          <p key={game.id}> {game.name} </p>
        ))}
      </div> */}
    </Modal>
>>>>>>> 570637eba13ca49f4572b07d083ea77a5c72cf49
  );
}

export default SearchBar;