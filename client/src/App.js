import Header from './components/Header/Header';
import PostList from './components/Posts/PostList/PostList';
import { mockGamePosts } from './MockData/MockGamePosts';

function App() {
  return (
    <>
      <Header />
      <PostList posts={mockGamePosts}/>
    </>
  );
}

export default App;
