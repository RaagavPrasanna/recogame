import styles from './UserSettings.module.css';
import Modal from '../../UI/Modal/Modal.js';
import SettingsSwitch from './SettingsSwitch';
import Button from '../../UI/Button/Button';

function UserSettings() {
  return (
    <Modal>
      <div className={styles.settings}>
        <h2>Settings</h2>
        <SettingsSwitch label={'Share My Data'} />
        <SettingsSwitch label={'Other Setting'} />
        <SettingsSwitch label={'Other Setting'} />
        <SettingsSwitch label={'Other Setting'} />
        <div className={styles.buttons}>
          <Button>Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </Modal>
  );
}

export default UserSettings;
