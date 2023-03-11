import Button from '../UI/Button/Button';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import PostContext from '../../store/posts-context';
import LanguageSelector from '../../MultiLanguage/LanguageSelector';
import { useTranslation } from 'react-i18next';

function Header() {
  const [navBg, setNavBg] = useState(false);
  const postCtx = useContext(PostContext);
  const headerRef = useRef();
  const { t } = useTranslation();

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
      <header className={styles.buttons} onClick={postCtx.handlePostClick}>
        <Link to="/">
          <Button>{t('Home')}</Button>
        </Link>
        <Button> My Game List </Button>
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
        <Link to="/login">
          <Button> {t('Log In')} </Button>
        </Link>
        <Button> {t('Search')} </Button>
        <Button><LanguageSelector/></Button>
      </header>
    </div>
  );
}

export default Header;
