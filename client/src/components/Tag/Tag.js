import styles from './Tag.module.css';
import { BsXSquare } from 'react-icons/bs';

function Tag({ tagName, closable, type }) {
  return (
    <div className={styles.tag}>
      {`${tagName}`}
      {closable && (
        <span className={styles.close}>
          <BsXSquare />
        </span>
      )}
    </div>
  );
}

export default Tag;
