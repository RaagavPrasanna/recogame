import Button from '../UI/Button/Button';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

function Header() {
  const [navBg, setNavBg] = useState(false);
  const headerRef = useRef();

  const changeNavBg = () => {
    window.scrollY >= headerRef.current.offsetHeight
      ? setNavBg(true)
      : setNavBg(false);
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
        <Button> My Game List </Button>
        <Button> Community </Button>
        <Button> Friends </Button>
        <Link to="/profile">
          <Button> User </Button>
        </Link>
      </header>
      <header className={styles.search}>
        <Button> Log In </Button>
        <Button> Register </Button>
        <Button> Search </Button>
      </header>
    </div>
  );
}

export default Header;
