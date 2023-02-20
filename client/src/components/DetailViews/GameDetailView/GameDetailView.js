import { useEffect, useReducer, useState } from 'react';
import Button from '../../UI/Button/Button';
import { mockGamePosts } from '../../../MockData/MockGamePosts';

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
    return {
      gameTitle: game.gameTitle,
      gamePrice: game.price,
      gameImgSrc:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      gameDesc: game.description,
      reviews: [],
    };
  }

  return defaultGameDetails;
}

function GameDetailView({ id }) {
  const [gameDetails, dispatchGameDetails] = useReducer(gameReducer, {
    gameTitle: '',
    gamePrice: 0,
    gameImgSrc: '',
    gameDesc: '',
    reviews: [],
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // TODO: Use game id to fetch game details from the backend
    // TODO: Add loading animation while fetching data
    setIsLoading(true);
    const gameDetails = mockGamePosts.find((game) => game.id === id);
    dispatchGameDetails({ type: 'ADD_ALL_DETAILS', game: gameDetails });
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <h1>{gameDetails.gameTitle}</h1>
      <img src={gameDetails.gameImgSrc} />
      <div>
        <span>{gameDetails.gamePrice}</span>
        <Button>BUY</Button>
        <Button>ADD TO WISHLIST</Button>
        <Button>ADD TO MY GAMELIST</Button>
        {/* TODO: Drop down menu */}
      </div>
      <div>
        <h2>Community Review</h2>
        {/* TODO: Render reviews */}
      </div>
    </>
  );
}

export default GameDetailView;
