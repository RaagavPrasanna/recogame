import Button from '../UI/Button/Button';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import LanguageSelector from '../../multi_language/language_selector';
import { useTranslation } from 'react-i18next';

function Header() {
  const [navBg, setNavBg] = useState(false);
  const headerRef = useRef();
  const { t } = useTranslation();

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
          <Button>{t('Home')}</Button>
        </Link>
        <Button> {t('My Game List')} </Button>
        <Button> {t('Community')} </Button>
        <Button> {t('Friends')} </Button>
        <Button> {t('User')} </Button>
      </header>
      <header className={styles.search}>
        <Link to="/login">
          <Button> {t('Log In')} </Button>
        </Link>
        <Button> {t('Register')} </Button>
        <Button> {t('Search')} </Button>
        <LanguageSelector/>
      </header>
    </div>
  );
}

export default Header;
