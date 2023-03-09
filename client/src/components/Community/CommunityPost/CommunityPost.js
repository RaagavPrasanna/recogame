import { Link } from 'react-router-dom';
import styles from './CommunityPost.module.css';

function CommunityPost({
  gameTitle,
  devName,
  rating,
  id,
  review,
  onGameClick,
}) {
  return (
    <Link className={styles.communityPost} to={`/game/${id}`} onClick={onGameClick}>
      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
      <div>
        <h1>{gameTitle}</h1>
        <span>{devName}</span>
        <span>{'⭐️'.repeat(rating)}</span>
        <p>{review}</p>
      </div>
    </Link>
  );
}

export default CommunityPost;
