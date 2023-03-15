import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from 'react-icons/bs';

import styles from './Thumbs.module.css';

function Thumbs() {
  function thumbHandler(e) {
    e.preventDefault();
    const clicked = e.target;
    const thumb =
      clicked.closest('#thumbs-up') || clicked.closest('#thumbs-down');
    if (!thumb) {
      return;
    }
    console.log(thumb.id);
  }

  return (
    <div className={styles.thumbs} onClick={thumbHandler}>
      <BsFillHandThumbsUpFill className={styles['thumbs-up']} id="thumbs-up" />
      <BsFillHandThumbsDownFill
        className={styles['thumbs-down']}
        id="thumbs-down"
      />
    </div>
  );
}

export default Thumbs;
