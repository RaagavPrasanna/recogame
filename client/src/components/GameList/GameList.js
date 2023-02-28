import Popup from 'reactjs-popup';
import Button from '../UI/Button/Button';
import classes from './GameList.module.css';

function GameList() {


  return (
    <div className={classes.gameList}>
      <br />
      <br />
      <br />
      <h3> Wishlist </h3>
      <section className={classes.card}>
        Lorem ipsum dolor sit amet.
        <Popup trigger={<Button> Edit </Button>} modal>
          {close => (
            <div className={classes.buttons}>
              <Button> Remove </Button>
              <Button onClick={ close }> Cancel </Button>
            </div>
          )}
        </Popup>
      </section>
      <h3> In progress</h3>

      <h3> Finished </h3>

      <h3> Completed 100% Achievements </h3>

      <h3> Never Played </h3>
    </div>
  );
}

export default GameList;
