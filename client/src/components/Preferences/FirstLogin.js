import PreferenceForm from './PreferenceForm';
import classes from './Preferences.module.css';
import { useContext, useState } from 'react';
import UserContext from '../../store/user-context';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../UI/Button/Button';

function FirstLogin() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [userPrefs, setUserPrefs] = useState(
    {
      playedGames: [],
      platforms: [],
      genres: [],
      categories: [],
    }
  );

  async function submitForm() {
    if(userPrefs.playedGames.length === 0) {
      // eslint-disable-next-line no-alert
      alert('Please select at least one game');
    } else if(userPrefs.platforms.length === 0) {
      // eslint-disable-next-line no-alert
      alert('Please select at least one platform');
      return;
    } else if(userPrefs.genres.length === 0) {
      // eslint-disable-next-line no-alert
      alert('Please select at least one genre');
      return;
    } else if(userPrefs.categories.length === 0) {
      // eslint-disable-next-line no-alert
      alert('Please select at least one category');
      return;
    } else {

      const resp = await fetch('/authentication/csrf-token');
      const { token } = await resp.json();

      const response = await fetch('/authentication/update-user-preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': token,
        },
        body: JSON.stringify(userPrefs)
      });

      if(response.status === 200) {
        navigate('/');
      }
      // eslint-disable-next-line no-alert
    }
  }



  const content = () => {
    if(user === null) {
      console.log('reached here');
      return (
        <Button>
          <Link to="/login">Login</Link>
        </Button>
      );
    } else {
      return (
        <>
          <p>First Login Component</p>
          <PreferenceForm userPrefs={userPrefs} setUserPrefs={setUserPrefs} submitForm={submitForm}/>
        </>
      );
    }
  };

  return (
    <div className={classes.main_content}>
      {content()}
    </div>
  );
}

export default FirstLogin;