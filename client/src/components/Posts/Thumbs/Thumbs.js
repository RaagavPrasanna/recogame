import { useContext, useState } from 'react';
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from 'react-icons/bs';
import UserContext from '../../../store/user-context';

import styles from './Thumbs.module.css';

function Thumbs({ likes, dislikes }) {
  const [isThumbsUp, setIsThumbsUp] = useState(false);
  const [isThumbsDown, setIsThumbsDown] = useState(false);
  const userCtx = useContext(UserContext);

  function thumbHandler(e) {
    e.preventDefault();

    if (!userCtx.user) {
      return;
    }

    const clicked = e.target;
    const thumb =
      clicked.closest('#thumbs-up') || clicked.closest('#thumbs-down');
    if (!thumb) {
      return;
    }
    const clickedThumb = thumb.id;

    if (clickedThumb === 'thumbs-up') {
      isThumbsUp || thumbsUp();
    }

    if (clickedThumb === 'thumbs-down') {
      isThumbsDown || thumbsDown();
    }
  }

  function thumbsUp() {
    setIsThumbsDown(false);
    setIsThumbsUp(true);
  }

  function thumbsDown() {
    setIsThumbsUp(false);
    setIsThumbsDown(true);
  }

  return (
    <div className={styles.thumbs} onClick={thumbHandler}>
      <div className={styles['thumbs-container']}>
        <BsFillHandThumbsUpFill
          className={`${styles['thumbs-up']} ${userCtx.user && styles.clickable} ${isThumbsUp && styles.clicked}`}
          id="thumbs-up"
        />
        <p>{likes || 0}</p>
      </div>

      <div className={styles['thumbs-container']}>
        <BsFillHandThumbsDownFill
          className={`${styles['thumbs-down']} ${userCtx.user && styles.clickable} ${isThumbsDown && styles.clicked }`}
          id="thumbs-down"
        />
        <p>{dislikes || 0}</p>
      </div>
    </div>
  );
}

export default Thumbs;
