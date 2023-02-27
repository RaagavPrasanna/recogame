import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './Home';
import GameDetailView from './components/DetailViews/GameDetailView/GameDetailView';
import UserProfile from './components/User/UserProfile/UserProfile';
import UserSettings from './components/User/UserSettings/UserSettings';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetailView />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/profile/settings" element={<UserSettings />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
