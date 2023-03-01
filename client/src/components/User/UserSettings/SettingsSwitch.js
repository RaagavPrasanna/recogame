import Switch from 'react-switch';
import { useState } from 'react';

function SettingsSwitch({ label }) {
  const [isEnabled, setIsEnabled] = useState(false);

  function changeHandler() {
    setIsEnabled((prevState) => !prevState);
  }

  return (
    <label>
      <span>{label}</span>
      <Switch onChange={changeHandler} checked={isEnabled} />
    </label>
  );
}

export default SettingsSwitch;
