import styles from './Tag.module.css';

function Tag({ tagName }) {
  return <div className={styles.tag}>{tagName}</div>;
}

export default Tag;
