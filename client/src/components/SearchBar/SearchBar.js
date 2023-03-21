import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './SearchBar.module.css';
import Modal from '../UI/Modal/Modal';

function SearchBar() {
  const [userInput, setUserInput] = useState('');
  const [dataJson, setDataJson] = useState([]);
  const [show, setShow] = useState(false);



  function inputHandler(e) {
    setUserInput(e.target.value.toLowerCase());
  }

  function handleClose() {
    setShow(false);
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
    return `${game.name}`.toLowerCase().includes(userInput);
  });


  return (
    <Modal
      className={styles.search}
      onClick = { handleClose }
    >
      <input type="search" placeholder="Search Game" onChange={ inputHandler } />
      {filteredData.map((game) => (
        <p key={game.id}>
          <Link to={`/game/${game.id}`} onClick={handleClose}>
            {game.name}
          </Link>
        </p>
      ))}
    </Modal>
  );
}

export default SearchBar;