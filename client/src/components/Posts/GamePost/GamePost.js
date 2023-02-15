import styles from './GamePost.module.css';

function GamePost({ gameTitle, devName, review, rating }) {
  return (
    <li className={styles.gamepost}>
      <img
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        width={100}
      />
      <div>
        <h1>{gameTitle}</h1>
        <span>{devName}</span>
        <span>{'⭐️'.repeat(rating)}</span>
        <p>{review}</p>
      </div>
    </li>
  );
}

export default GamePost;
