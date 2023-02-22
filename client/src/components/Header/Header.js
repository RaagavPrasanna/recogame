import Button from '../UI/Button/Button';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <>
      <header className={styles.header}>
        <Link to="/">
          <Button> Home </Button>
        </Link>
        <Button> My Game List </Button>
        <Button> Community </Button>
        <Button> Friends </Button>
        <Button> User </Button>
      </header>
      <header className={styles.search}>
        <Button> Log In </Button>
        <Button> Register </Button>
        <Button> Search </Button>
      </header>
    </>
  );
}

export default Header;
