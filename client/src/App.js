import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './Home';
import GameDetailView from './components/DetailViews/GameDetailView/GameDetailView';
import Login from './components/Forms/LoginForm';
import FriendList from './components/FriendList/FriendList/FriendList';
import CommunityList from './components/Community/CommunityList/CommunityList';

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
          <Route path="/community" element={<CommunityList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
