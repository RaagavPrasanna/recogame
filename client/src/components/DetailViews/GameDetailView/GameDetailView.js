import { useEffect, useReducer, useState } from 'react';
import Button from '../../UI/Button/Button';
import styles from './GameDetailView.module.css';
import { useParams } from 'react-router-dom';
import Spinner from '../../UI/Spinner';

const defaultGameDetails = {
  name: '',
  price: 0,
  imageHeader: '',
  gameDesc: '',
  reviews: [],
};

function gameReducer(state, action) {
  if (action.type === 'ADD_ALL_DETAILS') {
    const { game } = action;
    console.log(game.background);
    return {
      name: game.name,
      price: game.price,
      background: game.background,
      imageHeader: game.imageHeader,
      gameDesc: game.shortDescription,
      storeUrl: game.storeUrl,
      reviews: [],
    };
  }

  return defaultGameDetails;
}

async function getGameDetails(id, callback) {
  const resp = await fetch(`/api/game/info/${id}`);
  if (!resp.ok) {
    throw new Error(`Could not fetch game (${resp.status})`);
  }
  const data = await resp.json();
  console.log(data);
  callback(data);
}

function GameDetailView() {
  const { id } = useParams();
  const [gameDetails, dispatchGameDetails] = useReducer(
    gameReducer,
    defaultGameDetails
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // TODO: Use game id to fetch game details from the backend
    // TODO: Add loading animation while fetching data
    setIsLoading(true);
    getGameDetails(id, (data) => {
      dispatchGameDetails({ type: 'ADD_ALL_DETAILS', game: data });
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={styles.spinner}>
          <Spinner />
        </div>
      ) : null}
      <div
        className={styles.gameDetails}
        style={{
          background: `url(${gameDetails.background})`,
        }}
      >
        {isLoading && <p>Loading...</p>}
        <h1>{gameDetails.name}</h1>
        <img src={gameDetails.imageHeader} />
        <div className={styles.buttons}>
          <Button onClick={() => window.open(gameDetails.storeUrl, '_blank')}>
            BUY ON STEAM
          </Button>
          <Button>ADD TO WISHLIST</Button>
          <Button>ADD TO MY GAMELIST</Button>
          {/* TODO: Drop down menu */}
        </div>
        <p className={styles.desc}>{gameDetails.gameDesc}</p>
      </div>
      <div className={styles.reviews}>
        <h2>Community Reviews</h2>
        {/* TODO: Render reviews */}
      </div>
    </>
  );
}

export default GameDetailView;
