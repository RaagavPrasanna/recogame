import { useContext, useEffect, useReducer, useState } from 'react';
import Button from '../../UI/Button/Button';
import styles from './GameDetailView.module.css';
import { useParams } from 'react-router-dom';
import PostContext from '../../../store/posts-context';

const defaultGameDetails = {
  gameTitle: '',
  gamePrice: 0,
  gameImgSrc: '',
  gameDesc: '',
  reviews: [],
};

function gameReducer(state, action) {
  if (action.type === 'ADD_ALL_DETAILS') {
    const { game } = action;
    console.log(game);
    return {
      gameTitle: game.name,
      gamePrice: game.price,
      gameImgSrc: game.imageHeader,
      gameDesc: game.shortDescription,
      reviews: [],
    };
  }

  return defaultGameDetails;
}

function GameDetailView() {
  const { id } = useParams();
  const postsCtx = useContext(PostContext);
  const [gameDetails, dispatchGameDetails] = useReducer(
    gameReducer,
    defaultGameDetails
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // TODO: Use game id to fetch game details from the backend
    // TODO: Add loading animation while fetching data
    setIsLoading(true);
    const gameDetails = postsCtx.homePosts.find(
      (game) => game.id === Number(id)
    );
    console.log(gameDetails);
    dispatchGameDetails({ type: 'ADD_ALL_DETAILS', game: gameDetails });
    setIsLoading(false);
  }, []);

  return (
    <div className={styles.gameDetails}>
      {isLoading && <p>Loading...</p>}
      <h1>{gameDetails.name}</h1>
      <img src={gameDetails.gameImgSrc} />
      <div className={styles.buttons}>
        <span>${gameDetails.gamePrice}</span>
        <Button>BUY</Button>
        <Button>ADD TO WISHLIST</Button>
        <Button>ADD TO MY GAMELIST</Button>
        {/* TODO: Drop down menu */}
      </div>
      <p className={styles.desc}>{gameDetails.gameDesc}</p>
      <div>
        <h2>Community Reviews</h2>
        {/* TODO: Render reviews */}
      </div>
    </div>
  );
}

export default GameDetailView;
