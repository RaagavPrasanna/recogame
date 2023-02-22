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
          {/* TODO: GameDetailView id prop should change dynamically depending on the id in the path */}
          <Route path="/game/:id" element={<GameDetailView id={1} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
