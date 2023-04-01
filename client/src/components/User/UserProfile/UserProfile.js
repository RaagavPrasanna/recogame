import Button from '../../UI/Button/Button';
import styles from './UserProfile.module.css';
import UserSettings from '../UserSettings/UserSettings';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import UserContext from '../../../store/user-context';
import Tag from '../../Tag/Tag';
import ThemeContext from '../../../store/theme-context';

async function getUserTags() {
  const resp = await fetch('/authentication/get-preferences');
  if (!resp.ok) {
    throw new Error(`Could not fetch tags (${resp.status})`);
  }
  const data = await resp.json();
  return data;
}

async function getGame(id) {
  const resp = await fetch(`/api/game/info/${id}`);
  if (!resp.ok) {
    throw new Error(`Could not fetch game (${resp.status})`);
  }
  const data = await resp.json();
  return { data, id };
}

function UserProfile() {
  const themeCtx = useContext(ThemeContext);
  const userCtx = useContext(UserContext);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [accountType, setAccountType] = useState('');
  const [img, setImg] = useState('');
  const { t } = useTranslation();
  const [preferences, setPreferences] = useState({});
  const [playedGames, setPlayedGames] = useState([]);

  useEffect(() => {
    if (userCtx.user === null) {
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

    getUserTags().then((data) => {
      setPreferences(data);
      getGames(data.playedGames);
    });
  }, []);

  function showSettings() {
    setIsSettingsVisible(true);
  }

  function hideSettings() {
    setIsSettingsVisible(false);
  }

  async function getGames(gameIds) {
    if (!preferences) {
      return;
    }
    const playedGames = await Promise.all(
      gameIds.map(async (id) => {
        return await getGame(id);
      })
    );
    setPlayedGames(playedGames);
  }

  const content = () => {
    if (userCtx.user === null) {
      return (
        <Button>
          <Link to="/login">{t('Login')}</Link>
        </Button>
      );
    } else {
      return (
        <>
          <img src={img} onClick={getGames} />
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
          <div className={`${styles.tags} ${styles[themeCtx.theme]}` }>
            <ul>
              <h3>Preferences</h3>
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
                  {preferences.categories?.map((cat, i) => {
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
          <div className={styles['played-games']}>
            <h2>{t('Played Games')}</h2>
            <hr></hr>
            <ul>
              {playedGames.map((game) => {
                return (
                  <Link key={game.id} to={`/game/info/${game.id}`}>
                    <li>{game.data.name}</li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </>
      );
    }
  };

  return <div className={styles['user-profile']}>{content()}</div>;
}

export default UserProfile;
