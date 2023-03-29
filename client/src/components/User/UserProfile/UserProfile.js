import Button from '../../UI/Button/Button';
import styles from './UserProfile.module.css';
import UserSettings from '../UserSettings/UserSettings';
import { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import UserContext from '../../../store/user-context';
import Tag from '../../Tag/Tag';

async function getUserTags() {
  const resp = await fetch('/authentication/get-preferences');
  if (!resp.ok) {
    throw new Error(`Could not fetch tags (${resp.status})`);
  }
  const data = await resp.json();
  return data;
}

function UserProfile() {
  const userCtx = useContext(UserContext);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [accountType, setAccountType] = useState('');
  const [img, setImg] = useState('');
  const { t } = useTranslation();
  const [preferences, setPreferences] = useState({});

  useEffect(() => {
    if (userCtx.user.provider === 'steam') {
      setUsername(userCtx.user.displayName);
      setAccountType(userCtx.user.provider);
      setImg(userCtx.user.photos[2].value);
    } else {
      setUsername(userCtx.user.name);
      setAccountType(userCtx.user.provider);
      setImg(userCtx.user.picture);
    }
    getUserTags().then(setPreferences);
  }, []);

  function showSettings() {
    setIsSettingsVisible(true);
  }

  function hideSettings() {
    setIsSettingsVisible(false);
  }

  return (
    <div className={styles['user-profile']}>
      <img src={img} />
      <Button onClick={showSettings} className={styles.settings}>
        {t('User Settings')}
      </Button>
      <div className={styles['user-info']}>
        <h2>{username}</h2>
        <h3>
          {t('Account Type: ')} {accountType}
        </h3>
      </div>
      {isSettingsVisible && <UserSettings onCancel={hideSettings} />}
      <div className={styles.tags}>
        <ul>
          <li>
            {t('GENRE')}{' '}
            <div className={styles['tag-container']}>
              {preferences.genres?.map((genre, i) => {
                return <Tag key={i} tagName={genre} tagType="genres" />;
              })}
            </div>
          </li>
          <li>
            {`${t('CATEGORIES')}`}
            <div className={styles['tag-container']}>
              {preferences.category?.map((cat, i) => {
                return <Tag key={i} tagName={cat} tagType="categories" />;
              })}
            </div>
          </li>
          <li>
            {t('PLATFORMS')}
            <div className={styles.platforms}>
              {preferences.platforms?.map((plat, i) => {
                return <Tag key={i} tagName={plat} tagType="platforms" />;
              })}
            </div>
          </li>
        </ul>
      </div>
      <div className={styles['game-recommendations']}>
        <h2>{t('Played Games')}</h2>
        <hr></hr>
      </div>
    </div>
  );
}

export default UserProfile;
