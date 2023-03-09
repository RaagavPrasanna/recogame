import Button from '../../UI/Button/Button';
import styles from './UserProfile.module.css';
import UserSettings from '../UserSettings/UserSettings';
import { useState, useEffect } from 'react';

function UserProfile() {
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [accountType, setAccountType] = useState('');

  useEffect(() => {
    // TODO: Fetch account details from the server
    setUsername('USERNAME123');
    setAccountType('Steam Account');
  }, []);

  function showSettings() {
    setIsSettingsVisible(true);
  }

  function hideSettings() {
    setIsSettingsVisible(false);
  }

  return (
    <div className={styles['user-profile']}>
      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
      <Button onClick={showSettings} className={styles.settings}>
        User Settings
      </Button>
      <div className={styles['user-info']}>
        <h2>{username}</h2>
        <h3>Account Type: {accountType}</h3>
      </div>
      {isSettingsVisible && <UserSettings onCancel={hideSettings} />}
      <div className={styles['game-recommendations']}>
        <h2>Game Recommendations</h2>
        <hr></hr>
      </div>
    </div>
  );
}

export default UserProfile;
