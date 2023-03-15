import {
  BsFillHandThumbsUpFill,
  BsFillHandThumbsDownFill,
} from 'react-icons/bs';

import styles from './Thumbs.module.css';

function Thumbs() {
  return (
    <div className={styles.thumbs}>
      <BsFillHandThumbsUpFill />
      <BsFillHandThumbsDownFill />
    </div>
  );
}

export default Thumbs;
