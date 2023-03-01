import styles from './UserSettings.module.css';
import Modal from '../../UI/Modal/Modal.js';
import SettingsSwitch from './SettingsSwitch';

function UserSettings() {
  return (
    <Modal>
      <div className={styles.settings}>
        <h2>Settings</h2>
        <SettingsSwitch label={'Share Data'} />
      </div>
    </Modal>
  );
}

export default UserSettings;
