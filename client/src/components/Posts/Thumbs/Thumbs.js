import { useState } from 'react';
import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from 'react-icons/bs';

import styles from './Thumbs.module.css';

function Thumbs() {
  const [isThumbsUp, setIsThumbsUp] = useState(false);
  const [isThumbsDown, setIsThumbsDown] = useState(false);

  function thumbHandler(e) {
    e.preventDefault();
    const clicked = e.target;
    const thumb =
      clicked.closest('#thumbs-up') || clicked.closest('#thumbs-down');
    if (!thumb) {
      return;
    }
    const clickedThumb = thumb.id;

    if (clickedThumb === 'thumbs-up') {
      thumbsUp();
    }

    if (clickedThumb === 'thumbs-down') {
      thumbsDown();
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
      <BsFillHandThumbsUpFill
        className={`${styles['thumbs-up']} ${isThumbsUp && styles.clicked}`}
        id="thumbs-up"
      />
      <BsFillHandThumbsDownFill
        className={`${styles['thumbs-down']} ${isThumbsDown && styles.clicked}`}
        id="thumbs-down"
      />
    </div>
  );
}

export default Thumbs;
