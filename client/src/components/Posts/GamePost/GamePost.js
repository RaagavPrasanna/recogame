import { Link } from 'react-router-dom';
import styles from './GamePost.module.css';

function GamePost({
  gameTitle,
  devName,
  description,
  rating,
  id,
  onGameClick,
  imageSrc
}) {
  return (
    <Link className={styles.gamepost} to={`/game/${id}`} onClick={onGameClick}>
      <img
        src={imageSrc}
      />
      <div>
        <h1>{gameTitle}</h1>
        <span>{devName}</span>
        <span>{'⭐️'.repeat(rating)}</span>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default GamePost;
