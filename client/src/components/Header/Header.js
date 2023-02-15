import Button from '../UI/Button/Button';
import styles from './Header.module.css';

function Header() {
  return (
    <>
      <header className={styles.header}>
        <Button> Home </Button>
        <Button> My Game List </Button>
        <Button> Community </Button>
        <Button> Friends </Button>
        <Button> User </Button>
      </header>
      <header className={styles.search}>
        <Button> Search </Button>
      </header>
    </>
  );
}

export default Header;
