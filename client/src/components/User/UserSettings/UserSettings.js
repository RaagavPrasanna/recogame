import styles from './UserSettings.module.css';
import Modal from '../../UI/Modal/Modal.js';
import SettingsSwitch from './SettingsSwitch';
import Button from '../../UI/Button/Button';
import { useEffect, useRef } from 'react';

function UserSettings({ onCancel }) {
  const shareDataRef = useRef();

  //TODO: Add use effect to get user settings from the server.
  //      Add asn isChecked prop to the SettingsSwitch component.
  useEffect(() => {}, []);

  function saveSettings() {
    console.log('shareData: ', shareDataRef.current.isEnabled);
  }

  return (
    <Modal>
      <div className={styles.settings}>
        <h2>Settings</h2>
        <SettingsSwitch label={'Share My Data'} ref={shareDataRef} />
        <SettingsSwitch label={'Other Setting'} />
        <SettingsSwitch label={'Other Setting'} />
        <SettingsSwitch label={'Other Setting'} />
        <div className={styles.buttons}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button onClick={saveSettings}>Save Changes</Button>
        </div>
      </div>
    </Modal>
  );
}

export default UserSettings;
