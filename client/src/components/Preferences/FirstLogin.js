import PreferenceForm from './PreferenceForm';
import classes from './Preferences.module.css';
import { useContext, useState } from 'react';
import UserContext from '../../store/user-context';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../UI/Button/Button';
import { useTranslation } from 'react-i18next';

// Component to display the first login pages
function FirstLogin() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [userPrefs, setUserPrefs] = useState(
    {
      playedGames: [],
      platforms: [],
      genres: [],
      categories: [],
    }
  );

  // Function to submit the form
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

      // Fetch the CSRF token from the server
      const resp = await fetch('/authentication/csrf-token');
      const { token } = await resp.json();

      // Send the user preferences to the server with the CSRF token
      const response = await fetch('/authentication/update-user-preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': token,
        },
        body: JSON.stringify(userPrefs)
      });

      // If the response is 200, redirect to the home page
      if(response.status === 200) {
        navigate('/');
      }
    }
  }



  //  If user is null, display the login button
  const content = () => {
    if(user === null) {
      return (
        <Button>
          <Link to="/login">{t('Login')}</Link>
        </Button>
      );
    } else {
      return (
        <div>
          <PreferenceForm
            userPrefs={userPrefs}
            setUserPrefs={setUserPrefs}
            submitForm={submitForm}
          />
        </div>
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