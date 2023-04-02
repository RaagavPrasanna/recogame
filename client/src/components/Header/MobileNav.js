import Button from '../UI/Button/Button';
import styles from './MobileNav.module.css';
import { Link } from 'react-router-dom';
import LanguageSelector from '../../MultiLanguage/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import MenuToggle from './HamburgerToggle';

function MobileNav({ handlePageChange, retUserAuthButton }) {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={`${styles.menu}`} onClick={handlePageChange}>
      {/* Conditionally show hamburger menu based on whether the toggle is clicked or not */}
      <MenuToggle isOpen={isOpen} toggle={setOpen.bind(null, !isOpen)} />
      <div className={`${styles.options} ${isOpen && styles.visible}`}>
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
        {retUserAuthButton()}
        <Button className={styles['lang-btn']}>
          <LanguageSelector className={styles['lang-selector']} />
        </Button>
      </div>
    </div>
  );
}

export default MobileNav;
