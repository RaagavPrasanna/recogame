import { useState } from 'react';
import Button from '../UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import classes from './GameList.module.css';

function GameList() {
  const [visible, setVisible] = useState(false);

  return (
    <div className={classes.gameList}>
      <br />
      <br />
      <br />
      <h3> Wishlist </h3>
      <section className={classes.card}>
        <p>Lorem ipsum dolor sit amet.</p>
        <Button onClick={setVisible}> Edit </Button>
        <Modal onRequestClose={() => setVisible(false)} isOpen={visible}>
          <Button> Remove </Button>
          <Button onClick={() => setVisible(false)}> Close </Button>
        </Modal>
      </section>
      <h3> In progress</h3>

      <h3> Finished </h3>

      <h3> Completed 100% Achievements </h3>

      <h3> Never Played </h3>
    </div>
  );
}

export default GameList;
