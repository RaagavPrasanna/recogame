import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './Home';
import GameDetailView from './components/DetailViews/GameDetailView/GameDetailView';
import Login from './components/Forms/LoginForm';
import FriendList from './components/FriendList/FriendList/FriendList';
import GameList from './components/GameList/GameList';
import CommunityList from './components/Community/CommunityList/CommunityList';
import UserProfile from './components/User/UserProfile/UserProfile';
import { useContext, useEffect } from 'react';
import UserContext from './store/user-context';

function App() {
  const { user, setSessionUser } = useContext(UserContext);

  useEffect(() => {
    setSessionUser();
  }, [user]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/info/:id" element={<GameDetailView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/friends" element={<FriendList />} />
          <Route path="/gamelist" element={<GameList />} />
          <Route path="/community" element={<CommunityList />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
