import PreferenceForm from './PreferenceForm';
import classes from './Preferences.module.css';
import { useContext, useState } from 'react';
import UserContext from '../../store/user-context';
import { useNavigate } from 'react-router-dom';

function FirstLogin() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [userPrefs, setUserPrefs] = useState(
    {
      playedGames: [],
      platforms: [],
      keywords: [],
    }
  );

  async function submitForm() {
    if(userPrefs.platforms.length === 0) {
      // eslint-disable-next-line no-alert
      alert('Please select at least one platform');
      return;
    } else if(userPrefs.keywords.length === 0) {
      // eslint-disable-next-line no-alert
      alert('Please select at least one keyword');
      return;
    } else {
      console.log(userPrefs);
      console.log(user);
      // eslint-disable-next-line no-alert
      alert('posting prefs');
    }
  }

  if(user === null) {
    navigate('/login');
    return (<div></div>);
  }

  return (
    <div className={classes.main_content}>
      <p>First Login Component</p>
      <PreferenceForm userPrefs={userPrefs} setUserPrefs={setUserPrefs} submitForm={submitForm}/>
    </div>
  );
}

export default FirstLogin;