import styles from './Filter.module.css';
import Modal from '../UI/Modal/Modal';

function Filter({ handleShow }) {
  return <Modal className={styles['filter-container']} onClick={handleShow}></Modal>;
}

export default Filter;
