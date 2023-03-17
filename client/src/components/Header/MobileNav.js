import Button from '../UI/Button/Button';
import styles from './MobileNav.module.css';
import { Link } from 'react-router-dom';
import LanguageSelector from '../../MultiLanguage/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import MenuToggle from './MenuToggle';

function MobileNav({ handlePageChange, retUserAuthButton }) {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);

  return (
    <div className={`${styles.menu}`} onClick={handlePageChange}>
      <MenuToggle isOpen={isOpen} toggle={setOpen.bind(null, !isOpen)} />
      {isOpen && (
        <div className={styles.options}>
        </div>
      )}
    </div>
  );
}

export default MobileNav;
