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
        <div
          className={styles.background}
          style={{
            backgroundImage: `url(${imageSrc})`,
          }}
        ></div>
        <h1>{gameTitle}</h1>
        <div className={styles.thumbs}>
          <div className={styles.devName}>{devName}</div>
          <div className={styles.rating}>
            <span className={styles.stars}>{'⭐️'.repeat(rating)}</span>
            <Thumbs />
          </div>
        </div>
        <br />
        <br />
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default GamePost;
