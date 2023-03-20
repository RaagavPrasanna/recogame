import { useContext, useEffect } from 'react';
import PostList from './components/Posts/PostList/PostList';
import PostContext from './store/posts-context';

function Home() {
  const postCtx = useContext(PostContext);

  useEffect(() => {
    // Inform PostProvider that the Home component is mounted
    postCtx.homeMounted(true);

    // Inform PostProvider that the Home component is being dismounted
    return postCtx.homeMounted.bind(null, false);
  }, []);
  return (
    <>
      <PostList />
    </>
  );
}

export default Home;
