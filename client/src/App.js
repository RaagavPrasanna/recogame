import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './Home';
import GameDetailView from './components/DetailViews/GameDetailView/GameDetailView';
import Login from './components/Forms/LoginForm';
import GameList from './components/GameList/GameList';
import UserProfile from './components/User/UserProfile/UserProfile';
import { useContext, useEffect } from 'react';
import UserContext from './store/user-context';
import FirstLogin from './components/Preferences/FirstLogin';


function App() {
  const { user, setSessionUser } = useContext(UserContext);

  useEffect(() => {
    setSessionUser();
  }, [user]);

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/info/:id" element={<GameDetailView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/gamelist" element={<GameList />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/firstLogin" element={<FirstLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
