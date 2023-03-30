// import Popup from 'reactjs-popup';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import classes from './GameList.module.css';
import { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import UserContext from '../../store/user-context';
import { Link } from 'react-router-dom';

async function getUserWishlist() {
  const resp = await fetch('/authentication/get-preferences');
  if (!resp.ok) {
    throw new Error(`Could not fetch user (${resp.status})`);
  }
  const data = await resp.json();
  return data;
}

async function getGame(id) {
  const resp = await fetch(`/api/game/info/${id}`);
  if (!resp.ok) {
    throw new Error(`Could not fetch game (${resp.status})`);
  }
  const data = await resp.json();
  return { data, id };
}

function GameList() {
  // TODO: Add tags to so it can go to the right section
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    getUserWishlist().then((data) => {
      getGames(data.wishlist);
    });
  }, []);

  async function getGames(gameIds) {
    if (wishlist.length > 0) {
      return;
    }

    const wishlistGames = await Promise.all(
      gameIds.map(async (id) => {
        return await getGame(id);
      })
    );
    setWishlist(wishlistGames);
  }

  const content = () => {
    if (user === null) {
      return (
        <Button>
          <Link to-="/login"> {t('Login')} </Link>
        </Button>
      );
    } else {
      return (
        <>
          <h2> {t('Wishlist')} </h2>

          <section>
            <ul>
              {wishlist.map((game) => {
                return (
                  <Link key={game.id} to={`/game/info/${game.id}`}>
                    <li>{game.data.name}</li>
                  </Link>
                );
              })}
            </ul>
          </section>
        </>
      );
    }
  };

  return <div className={classes.gameList}>{content()}</div>;
}

export default GameList;
