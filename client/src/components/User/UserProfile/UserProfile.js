import Button from '../../UI/Button/Button';
import styles from './UserProfile.module.css';
import UserSettings from '../UserSettings/UserSettings';
import { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import UserContext from '../../../store/user-context';

function UserProfile() {
  const userCtx = useContext(UserContext);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [accountType, setAccountType] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    setUsername(userCtx.user.displayName);
    setAccountType(userCtx.user.provider);
  }, []);

  function showSettings() {
    setIsSettingsVisible(true);
  }

  function hideSettings() {
    setIsSettingsVisible(false);
  }

  return (
    <div className={styles['user-profile']}>
      <img src={userCtx.user.photos[2].value} />
      <Button onClick={showSettings} className={styles.settings}>
        {t('User Settings')}
      </Button>
      <div className={styles['user-info']}>
        <h2>{username}</h2>
        <h3>{t('Account Type: ')} {accountType}</h3>
      </div>
      {isSettingsVisible && <UserSettings onCancel={hideSettings} />}
      <div className={styles['game-recommendations']}>
        <h2>{t('Game Recommendations')}</h2>
        <hr></hr>
      </div>
    </div>
  );
}

export default UserProfile;
