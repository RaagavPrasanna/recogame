import Button from '../UI/Button/Button';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, useContext } from 'react';
import UserContext from '../../store/user-context';

function Header() {
  const [navBg, setNavBg] = useState(false);
  const headerRef = useRef();

  const { user, logout } = useContext(UserContext);

  const changeNavBg = () => {
    window.scrollY >= headerRef.current.offsetHeight ? setNavBg(true) : setNavBg(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNavBg);
    return () => {
      window.removeEventListener('scroll', changeNavBg);
    };
  }, []);

  const retUserAuthButton = () => {
    if(user !== null) {
      return ( <Button onClick={logout}> Log Out here {user.provider === 'google' ? user.name : user.name} </Button> );
    } else {
      return ( <Link to="/login">
        <Button> Log In </Button>
      </Link> );
    }
  };

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
        <Button> User </Button>
      </header>
      <header className={styles.search}>
        {retUserAuthButton()}
        <Button> Register </Button>
        <Button> Search </Button>
      </header>
    </div>
  );
}

export default Header;
