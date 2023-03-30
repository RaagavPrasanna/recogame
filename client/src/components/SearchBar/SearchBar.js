import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './SearchBar.module.css';
import Modal from '../UI/Modal/Modal';
import { useTranslation } from 'react-i18next';


function SearchBar(props) {
  const [userInput, setUserInput] = useState('');
  const [dataJson, setDataJson] = useState([]);
  const { t } = useTranslation();

  function inputHandler(e) {
    setUserInput(e.target.value.toLowerCase());
  }

  function handleGame() {
    props.handleShow;
    location.redirect();
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
    <Modal className={styles.search} onClick={props.handleShow}>
      <input type="search" placeholder={t('Search Game')} onChange={inputHandler} />
      {filteredData.slice(0, 10).map((game) => (
        <p key={game.id}>
          <Link to={`/game/info/${game.id}`} onClick={handleGame} >
            {game.name}
          </Link>
        </p>
      ))}
    </Modal>
  );
}

export default SearchBar;