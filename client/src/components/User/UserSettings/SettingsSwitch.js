import React, { useImperativeHandle } from 'react';
import Switch from 'react-switch';
import { useState } from 'react';
import styles from './SettingsSwitch.module.css';

const SettingsSwitch = React.forwardRef(function SettingsSwitch(
  { label },
  ref
) {
  const [isEnabled, setIsEnabled] = useState(false);

  function changeHandler() {
    setIsEnabled((prevState) => !prevState);
  }

  useImperativeHandle(ref, () => {
    return {
      isEnabled,
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

export default SettingsSwitch;
