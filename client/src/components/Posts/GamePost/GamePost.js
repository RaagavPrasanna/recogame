import { Link } from 'react-router-dom';
import Thumbs from '../Thumbs/Thumbs';
import styles from './GamePost.module.css';

function GamePost({
  gameTitle,
  devName,
  description,
  rating,
  id,
  onGameClick,
  imageSrc,
}) {
  return (
    <Link className={styles.gamepost} to={`/game/${id}`} onClick={onGameClick}>
      <img src={imageSrc} />
      <div className={styles.details}>
        <div className={styles.thumbs}>
          <h1>{gameTitle}</h1>
          <Thumbs />
        </div>
        <span>{devName}</span>
        <span>{'⭐️'.repeat(rating)}</span>
        <br />
        <br />
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default GamePost;
