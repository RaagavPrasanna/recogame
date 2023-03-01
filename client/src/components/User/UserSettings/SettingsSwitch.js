import React, { useImperativeHandle } from 'react';
import Switch from 'react-switch';
import { useState } from 'react';
import styles from './SettingsSwitch.module.css';

const SettingsSwitch = React.forwardRef(({ label }, ref) => {
  const [isEnabled, setIsEnabled] = useState(false);

  function changeHandler() {
    setIsEnabled((prevState) => !prevState);
  }

  useImperativeHandle(ref, () => {
    return {
      isEnabled
    };
  });

  return (
    <div className={styles.switchContainer}>
      <label htmlFor={label}>{label}</label>
      <Switch
        id={label}
        onChange={changeHandler}
        checked={isEnabled}
        className={styles.switch}
      />
    </div>
  );
});

SettingsSwitch.displayName = 'SettingsSwitch';
export default SettingsSwitch;
