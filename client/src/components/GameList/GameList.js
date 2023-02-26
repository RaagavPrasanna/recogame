import { useState } from 'react';
import Button from '../UI/Button/Button';
import classes from './GameList.module.css';

function GameList() {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div className={classes.gameList}>
      <h3> Wishlist </h3>
      <article>
        <input type='checkbox' onChange={handleChange} />
        Lorem ipsum dolor sit amet.
        <Button> Edit </Button>
      </article>
      <br />
      <Button> Remove </Button>
      <h3> In progress</h3>

      <h3> Finished </h3>

      <h3> Completed 100% Achievements </h3>

      <h3> Never Played </h3>
    </div>
  );
}

export default GameList;
