import Header from './components/Header/Header';
import PostList from './components/Posts/PostList/PostList';
// import LoginForm from './components/Forms/LoginForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';

function App() {
  return (
    <>
      <Header />
      <PostList />
      {/* <LoginForm /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
