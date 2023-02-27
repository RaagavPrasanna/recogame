import styles from './UserProfile.module.css';

function UserProfile({ username }) {
  return (
    <div className={styles['user-profile']}>
      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
      <div className={styles['user-info']}>
        <h2>{username}</h2>
        <span className={styles.settings}>User Settings</span>
      </div>
    </div>
  );
}

export default UserProfile;
