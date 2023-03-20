import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './SearchBar.module.css';
import Modal from '../UI/Modal/Modal';

function SearchBar({
  onCancel
}) {
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

  const filteredData = dataJson.filter((game) => {
    if (userInput === '') {
      return game;
    } else {
      return game.name.toLowerCase().includes(userInput);
    }
  });


  return (
    <Modal className={styles.search} onClick={onCancel}>
      <input type="search" placeholder="Search Game" onChange={inputHandler} />
      <div>
        {filteredData.map((game) => (
          <p key={game.id}>{game.name}</p>
        ))}
      </div>
    </Modal>
  );
}

export default SearchBar;