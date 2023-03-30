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
import Filter from '../Filter/Filter';

function Header() {
  const [navBg, setNavBg] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const postCtx = useContext(PostContext);
  const commCtx = useContext(CommunityContext);
  const userCtx = useContext(UserContext);
  const headerRef = useRef();
  const isMobile = useMediaQuery({ maxWidth: 700 });
  const { t } = useTranslation();

  const { user, logout } = useContext(UserContext);

  function handleShowSearch() {
    setShowSearch(!showSearch);
  }

  function handleShowFilter() {
    setShowFilter(!showFilter);
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
      className={`${styles.header} ${
        (navBg && styles.showBg) || (isMobile && styles.showBg)
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
                <Button>{t('Home')}</Button>
              </Link>
              {userCtx.user && (
                <>
                  <Link to="/profile">
                    <Button> {t('User')} </Button>
                  </Link>
                  <Link to="/gamelist">
                    <Button> {t('My Game List')} </Button>
                  </Link>
                </>
              )}
            </span>
          </>
        )}
        <span className={styles['right-section']}>
          <Button onClick={handleShowFilter}> {t('Filter')}</Button>
          <Button onClick={handleShowSearch}> {t('Search')} </Button>
          {showFilter && <Filter handleShow={handleShowFilter} />}
          {showSearch && <SearchBar handleShow={handleShowSearch} />}
          {isMobile || (
            <>
              {retUserAuthButton()}
              <Button className={styles['lang-btn']}>
                <LanguageSelector className={styles['lang-selector']} />
              </Button>
            </>
          )}
        </span>
      </header>
    </div>
  );
}

export default Header;
