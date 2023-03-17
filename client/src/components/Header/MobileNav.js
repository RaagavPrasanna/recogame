import Button from '../UI/Button/Button';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import LanguageSelector from '../../MultiLanguage/LanguageSelector';
import { useTranslation } from 'react-i18next';

function MobileNav({
  handlePageChange,
  changeNavBg,
  headerRef,
  navBg,
  retUserAuthButton,
}) {
  const { t } = useTranslation();

  return (
    <div
      className={`${styles.header} ${navBg && styles.showBg}`}
      onScroll={changeNavBg}
      ref={headerRef}
    >
      <header className={styles.buttons} onClick={handlePageChange}>
        <span className={styles['left-section']}>
          <Link to="/">
            <Button>{t('Home')}</Button>
          </Link>
          <Link to="/community">
            <Button> {t('Community')} </Button>
          </Link>
          <Link to="/friends">
            <Button> {t('Friends')} </Button>
          </Link>
          <Link to="/profile">
            <Button> {t('User')} </Button>
          </Link>
          <Link to="/gamelist">
            <Button> {t('My Game List')} </Button>
          </Link>
        </span>
        <span>
          {retUserAuthButton()}
          <Button> {t('Search')} </Button>
          <Button className={styles['lang-btn']}>
            <LanguageSelector className={styles['lang-selector']} />
          </Button>
        </span>
      </header>
    </div>
  );
}

export default MobileNav;
