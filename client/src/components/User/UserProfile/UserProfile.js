import Button from '../../UI/Button/Button';
import styles from './UserProfile.module.css';
import UserSettings from '../UserSettings/UserSettings';
import { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import UserContext from '../../../store/user-context';
import { Link } from 'react-router-dom';

function UserProfile() {
  const userCtx = useContext(UserContext);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [accountType, setAccountType] = useState('');
  const [img, setImg] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if(userCtx.user === null) {
      return;
    } else if (userCtx.user.provider === 'steam') {
      setUsername(userCtx.user.displayName);
      setAccountType(userCtx.user.provider);
      setImg(userCtx.user.photos[2].value);
    } else {
      setUsername(userCtx.user.name);
      setAccountType(userCtx.user.provider);
      setImg(userCtx.user.picture);
    }


  }, []);

  function showSettings() {
    setIsSettingsVisible(true);
  }

  function hideSettings() {
    setIsSettingsVisible(false);
  }

  const content = () => {
    if(userCtx.user === null) {
      return (
        <Button>
          <Link to="/login">{t('Login')}</Link>
        </Button>
      );
    } else {
      return (
        <>
          <img src={img} />
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
        </>
      );
    }
  };

  return (
    <div className={styles['user-profile']}>
      {content()}
    </div>
  );
}

export default UserProfile;
