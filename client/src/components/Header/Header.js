import Button from '../UI/Button/Button';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

function Header() {
  const [navBg, setNavBg] = useState(false);
  const headerRef = useRef();

  const changeNavBg = () => {
    window.scrollY >= headerRef.current.offsetHeight ? setNavBg(true) : setNavBg(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNavBg);
    return () => {
      window.removeEventListener('scroll', changeNavBg);
    };
  }, []);

  return (
    <div
      className={`${styles.header} ${navBg && styles.showBg}`}
      onScroll={changeNavBg}
      ref={headerRef}
    >
      <header className={styles.buttons}>
        <Link to="/">
          <Button> Home </Button>
        </Link>
        <Link to="/gamelist">
          <Button> My Game List </Button>
        </Link>
        <Button> Community </Button>
        <Link to="/friends">
          <Button> Friends </Button>
        </Link>
        <Button> User </Button>
      </header>
      <header className={styles.search}>
        <Link to="/login">
          <Button> Log In </Button>
        </Link>
        <Button> Register </Button>
        <Button> Search </Button>
      </header>
    </div>
  );
}

export default Header;
