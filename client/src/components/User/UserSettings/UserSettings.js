import styles from './UserSettings.module.css';
import Modal from '../../UI/Modal/Modal.js';
import SettingsSwitch from './SettingsSwitch';
import Button from '../../UI/Button/Button';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

function UserSettings({ onCancel }) {
  const makePrivateRef = useRef();
  const receiveMsgRef = useRef();
  const recommendGamesRef = useRef();
  const [isPublic, setIsPublic] = useState(false);
  const { t } = useTranslation();

  //TODO: Add use effect to get user settings from the server.
  //      Add asn isChecked prop to the SettingsSwitch component.
  useEffect(() => {
    setIsPublic(makePrivateRef.current.isEnabled);
  }, []);

  function saveSettings() {
    console.log('Settings Saved!');
    console.log({
      isProfilePrivate: makePrivateRef.current.isEnabled,
      isMessagesAllowed: receiveMsgRef.current?.isEnabled || false,
      isGameRecAllowed: recommendGamesRef.current?.isEnabled || false,
    });
  }

  function onPublicSwitch() {
    setIsPublic((prevState) => !prevState);
  }

  return (
    <Modal>
      <div className={styles.settings}>
        <h2>{t('Settings')}</h2>
        <hr></hr>
        <SettingsSwitch
          label={t('Make my profile private')}
          ref={makePrivateRef}
          onSwitch={onPublicSwitch}
        />
        {isPublic || (
          <>
            <SettingsSwitch
              label={t('Receive messages from other users')}
              ref={receiveMsgRef}
            />
            <SettingsSwitch
              label={t('Recommend my games to other users')}
              ref={recommendGamesRef}
            />
          </>
        )}
        <div className={styles.buttons}>
          <Button onClick={onCancel}>{t('Cancel')}</Button>
          <Button onClick={saveSettings}>{t('Save Changes')}</Button>
        </div>
      </div>
    </Modal>
  );
}

export default UserSettings;
