import Button from '../UI/Button/Button';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import PostContext from '../../store/posts-context';
import CommunityContext from '../../store/community-context';
import LanguageSelector from '../../MultiLanguage/LanguageSelector';
import { useTranslation } from 'react-i18next';
import UserContext from '../../store/user-context';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useMediaQuery } from 'react-responsive';
import MobileNav from './MobileNav';
import { Switch } from 'theme-ui';
import ThemeContext from '../../store/theme-context';
import Filter from '../Filter/Filter';

function Header() {
  const postCtx = useContext(PostContext);
  const commCtx = useContext(CommunityContext);
  const userCtx = useContext(UserContext);
  const themeCtx = useContext(ThemeContext);
  const { user, logout } = useContext(UserContext);

  const [navBg, setNavBg] = useState(false);
  const [theme, setTheme] = useState(themeCtx.theme);
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const navigate = useNavigate();

  const headerRef = useRef();
  const isMobile = useMediaQuery({ maxWidth: 700 });
  const { t } = useTranslation();

  function handleShowSearch() {
    setShowSearch(!showSearch);
  }

  function handleShowFilter() {
    setShowFilter(!showFilter);
  }

  const changeTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      themeCtx.setTheme('light');
    } else {
      setTheme('dark');
      themeCtx.setTheme('dark');
    }
  };

  const changeNavBg = () => {
    window.scrollY >= headerRef.current.offsetHeight
      ? setNavBg(true)
      : setNavBg(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNavBg);
    document.body.className = styles[theme];
    return () => {
      window.removeEventListener('scroll', changeNavBg);
    };
  }, [theme]);

  function handlePageChange() {
    postCtx.handlePostClick();
    commCtx.handlePostClick();
  }

  // Decide whether to show the login or logout button
  const retUserAuthButton = () => {
    if (user !== null) {
      return (
        <Button
          onClick={async () => {
            if (await logout()) {
              navigate('/');
            }
          }}
        >
          {' '}
          {t('Log Out here')}{' '}
          {user.provider === 'google' ? user.name : user.displayName}{' '}
        </Button>
      );
    } else {
      return (
        <Link to="/login">
          <Button> {t('Log In')} </Button>
        </Link>
      );
    }
  };

  return (
    <div
      className={`${styles.header}
        ${
    (navBg && `${styles.header} ${styles.showBg} ${styles[theme]}`) ||
          (isMobile && `${styles.header} ${styles.showBg} ${styles[theme]}`)
    }`}
      onScroll={changeNavBg}
      ref={headerRef}
    >
      <header className={styles.buttons} onClick={handlePageChange}>
        {isMobile ? (
          <MobileNav
            retUserAuthButton={retUserAuthButton}
            handlePageChange={handlePageChange}
          />
        ) : (
          <>
            <span className={styles['left-section']}>
              <Link to="/">
                <Button >{t('Home')}</Button>
              </Link>
              {userCtx.user && (
                <>
                  <Link to="/profile">
                    <Button > {t('User')} </Button>
                  </Link>
                  <Link to="/gamelist">
                    <Button > {t('My Game List')} </Button>
                  </Link>
                </>
              )}
            </span>
          </>
        )}
        <span className={styles['right-section']}>
          <Button onClick={handleShowFilter}  >
            {t('Filter')}
          </Button>
          <Button onClick={handleShowSearch}  >
            {t('Search')}
          </Button>
          {showFilter && <Filter handleShow={handleShowFilter} />}
          {showSearch && <SearchBar handleShow={handleShowSearch} />}
          {isMobile || (
            <>
              {retUserAuthButton()}
              <Button className={`${styles['lang-btn']} ${styles[theme]}`} >
                <LanguageSelector className={`${styles['lang-selector']} ${styles[theme]}`} />
              </Button>
              <Switch className={styles.switch } onClick={changeTheme} />
            </>
          )}
        </span>
      </header>
    </div>
  );
}

export default Header;
