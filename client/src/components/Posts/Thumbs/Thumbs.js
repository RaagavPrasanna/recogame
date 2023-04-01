import { useContext, useState } from 'react';
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from 'react-icons/bs';
import UserContext from '../../../store/user-context';

import styles from './Thumbs.module.css';

function Thumbs({ likes, dislikes, rating, gameId }) {
  const [shownRating, setShownRating] = useState(rating);
  const [shownLikes, setShownLikes] = useState(likes);
  const [shownDislikes, setShownDislikes] = useState(dislikes);

  const userCtx = useContext(UserContext);

  async function thumbHandler(e) {
    e.preventDefault();

    if (!userCtx.user) {
      return;
    }

    // Get clicked element
    const clicked = e.target;
    const thumb =
      clicked.closest('#thumbs-up') || clicked.closest('#thumbs-down');

    // Check if clicked element is a thumb
    if (!thumb) {
      return;
    }

    // Check if clicked element is thumbs up or thumbs down
    const clickedThumb = thumb.id;
    let newRating = Number(clickedThumb === 'thumbs-up') - Number(clickedThumb === 'thumbs-down');
    if (shownRating === newRating) {
      // Same thumb was clicked twice
      newRating = 0;
    }

    // Pre-update thumbs
    setShownRating(newRating);

    // Fetch the CSRF token from the server
    const resp = await fetch('/authentication/csrf-token');
    const { token } = await resp.json();

    // Send the thumb to the server with the CSRF token
    const response = await fetch('/authentication/thumbs/put', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token,
      },
      body: JSON.stringify({
        game: gameId,
        rating: newRating
      })
    });

    if (response.status === 200) {
      const json = await response.json();
      setShownRating(newRating);
      setShownLikes(json.likes);
      setShownDislikes(json.dislikes);
    } else {
      setShownRating(0);
      setShownLikes(likes);
      setShownDislikes(dislikes);
    }
  }

  return (
    <div className={styles.thumbs} onClick={thumbHandler}>
      <div className={styles['thumbs-container']}>
        <BsFillHandThumbsUpFill
          className={
            `${styles['thumbs-up']} ${userCtx.user && styles.clickable} ${shownRating > 0 && styles.clicked}`
          }
          id="thumbs-up"
        />
        <p>{shownLikes || 0}</p>
      </div>

      <div className={styles['thumbs-container']}>
        <BsFillHandThumbsDownFill
          className={
            `${styles['thumbs-down']} ${userCtx.user && styles.clickable} ${shownRating < 0 && styles.clicked}`
          }
          id="thumbs-down"
        />
        <p>{shownDislikes || 0}</p>
      </div>
    </div>
  );
}

export default Thumbs;
