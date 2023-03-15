import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from 'react-icons/bs';

import styles from './Thumbs.module.css';

function Thumbs() {
  return (
    <div className={styles.thumbs}>
      <BsFillHandThumbsUpFill className={styles['thumbs-up']} />
      <BsFillHandThumbsDownFill className={styles['thumbs-down']} />
    </div>
  );
}

export default Thumbs;
