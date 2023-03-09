import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './Home';
import GameDetailView from './components/DetailViews/GameDetailView/GameDetailView';
import Login from './components/Forms/LoginForm';
import FriendList from './components/FriendList/FriendList/FriendList';
<<<<<<< HEAD
import GameList from './components/GameList/GameList';
=======
import CommunityList from './components/Community/CommunityList/CommunityList';
>>>>>>> 515c74329a79c267809ff634fd530b0ba4ccc9b8

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetailView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/friends" element={<FriendList />} />
<<<<<<< HEAD
          <Route path="gamelist" element={<GameList />} />
=======
          <Route path="/community" element={<CommunityList />} />
>>>>>>> 515c74329a79c267809ff634fd530b0ba4ccc9b8
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
