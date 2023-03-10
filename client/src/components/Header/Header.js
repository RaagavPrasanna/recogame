import Button from '../UI/Button/Button';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import PostContext from '../../store/posts-context';
import CommunityContext from '../../store/community-context';

function Header() {
  const [navBg, setNavBg] = useState(false);
  const postCtx = useContext(PostContext);
  const commCtx = useContext(CommunityContext);
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

  function handlePageChange() {
    postCtx.handlePostClick();
    commCtx.handlePostClick();
  }

  return (
    <div
      className={`${styles.header} ${navBg && styles.showBg}`}
      onScroll={changeNavBg}
      ref={headerRef}
    >
      <header className={styles.buttons} onClick={handlePageChange}>
        <Link to="/">
          <Button> Home </Button>
        </Link>
        <Button> My Game List </Button>
        <Link to="/profile">
          <Button> User </Button>
        </Link>
        <Link to="/gamelist">
          <Button> My Game List </Button>
        </Link>
        <Link to="/community">
          <Button> Community </Button>
        </Link>
        <Link to="/friends">
          <Button> Friends </Button>
        </Link>
      </header>
      <header className={styles.search}>
        <Link to="/login">
          <Button> Log In </Button>
        </Link>
        <Button> Search </Button>
      </header>
    </div>
  );
}

export default Header;
