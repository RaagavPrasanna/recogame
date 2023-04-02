import { Link } from 'react-router-dom';
import Thumbs from '../Thumbs/Thumbs';
import styles from './GamePost.module.css';

function GamePost({
  gameTitle,
  devName,
  description,
  id,
  onGameClick,
  imageSrc,
  likes,
  dislikes,
  thumbs
}) {
  likes = likes || 0;
  dislikes = dislikes || 0;

  // Calulate star rating based on number of likes and dislakes
  const rating =
    (likes + dislikes > 0)
      ? ((likes - dislikes) / (likes + dislikes) * 2.5 + 2.5)
      : 2.5;

  return (
    <Link className={styles.gamepost} to={`/game/info/${id}`} onClick={onGameClick}>
      <div
        className={styles.background}
        style={{
          backgroundImage: `url(${imageSrc})`,
        }}
      ></div>
      <img src={imageSrc} />
      <div className={styles.details}>
        <h1>{gameTitle}</h1>
        <div className={styles.thumbs}>
          <div className={styles['dev-name']}>{devName}</div>
          <div className={styles.rating}>
            {/* Display stars based on calculated ratings */}
            <span className={styles.stars}>
              {'★'.repeat(Math.ceil(rating))}
              {'☆'.repeat(Math.floor(5 - rating))}
            </span>
            <Thumbs likes={likes} dislikes={dislikes} gameId={id} rating={thumbs} />
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
