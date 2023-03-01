import Button from '../../UI/Button/Button';
import styles from './UserProfile.module.css';
import UserSettings from '../UserSettings/UserSettings';

function UserProfile() {
  return (
    <div className={styles['user-profile']}>
      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
      <Button className={styles.settings}>User Settings</Button>
      <div className={styles['user-info']}>
        <h2>USERNAME123</h2>
      </div>
      <UserSettings />
    </div>
  );
}

export default UserProfile;
