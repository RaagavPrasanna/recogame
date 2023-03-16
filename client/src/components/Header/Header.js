import Button from '../UI/Button/Button';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import PostContext from '../../store/posts-context';
import LanguageSelector from '../../MultiLanguage/LanguageSelector';
import { useTranslation } from 'react-i18next';
import UserContext from '../../store/user-context';
import SearchBar from '../../SearchBar/SearchBar';

function Header() {
  const [navBg, setNavBg] = useState(false);
  const [show, setShow] = useState(false);

  const postCtx = useContext(PostContext);
  const headerRef = useRef();
  const { t } = useTranslation();

  const { user, logout } = useContext(UserContext);

  function handleShow() {
    setShow(true);
  }

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

  const retUserAuthButton = () => {
    if(user !== null) {
      // eslint-disable-next-line max-len
      return ( <Button onClick={logout} className={styles.log}> Log Out here:  {user.provider === 'google' ? user.name : user.displayName} </Button> );
    } else {
      return ( <Link to="/login">
        <Button className={styles.log}> {t('Log In')} </Button>
      </Link> );
    }
  };


  return (
    <div
      className={`${styles.header} ${navBg && styles.showBg}`}
      onScroll={changeNavBg}
      ref={headerRef}
    >
      <header className={styles.buttons} onClick={postCtx.handlePostClick}>
        <Link to="/">
          <Button>{t('Home')}</Button>
        </Link>
        <Link to="/profile">
          <Button> {t('User')} </Button>
        </Link>
        <Link to="/gamelist">
          <Button> {t('My Game List')} </Button>
        </Link>
        <Link to="/community">
          <Button> {t('Community')} </Button>
        </Link>
        <Link to="/friends">
          <Button> {t('Friends')} </Button>
        </Link>
      </header>
      <header className={styles.search}>
        {retUserAuthButton()}
        {/* {show && (<SearchBar />)}
        <Button onClick={handleShow}> {t('Search')} </Button> */}
        <SearchBar/>
        <Button ><LanguageSelector/></Button>
      </header>
    </div>
  );
}

export default Header;
