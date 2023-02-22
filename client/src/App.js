import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './Home';
import GameDetailView from './components/DetailViews/GameDetailView/GameDetailView';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetailView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
