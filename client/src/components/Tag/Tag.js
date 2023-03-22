import styles from './Tag.module.css';
import { useState } from 'react';
import { BsXSquare } from 'react-icons/bs';

function Tag({ tagName, closable }) {
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
