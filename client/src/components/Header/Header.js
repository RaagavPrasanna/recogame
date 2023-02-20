import Button from '../UI/Button/Button';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className={styles.header}>
      <header className={styles.buttons}>
        <Link to="/">
          <Button> Home </Button>
        </Link>
        <Button> My Game List </Button>
        <Button> Community </Button>
        <Button> Friends </Button>
        <Button> User </Button>
      </header>
      <header className={styles.search}>
        <Button> Search </Button>
      </header>
    </div>
  );
}

export default Header;
