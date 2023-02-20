import { useReducer } from 'react';
import Button from '../../UI/Button/Button';

function gameReducer(state, action) {}

function GameDetailView({ id }) {
  const [gameDetails, dispatchGameDetails] = useReducer(gameReducer, {
    gameName: '',
    gamePrice: 0,
    gameImgSrc: '',
    gameDesc: '',
    reviews: [],
  });

  return (
    <>
      <h1>{gameDetails.gameName}</h1>
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
