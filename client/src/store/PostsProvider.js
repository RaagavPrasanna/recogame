import PostContext from './posts-context';
import { useEffect, useState } from 'react';

async function getGamePage(page, callback) {
  const resp = await fetch(`/api/game/feed?page=${page}`);
  if (!resp.ok) {
    throw new Error(`Could not get page (${resp.status})`);
  }
  const data = await resp.json();
  callback(data);
}

function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  // TODO: Add separate scoll position states for each page
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currPageHome, setCurrPageHome] = useState(0);

  useEffect(() => {
    getGamePage(currPageHome, (data) => {
      setPosts((prevPosts) => {
        return [...prevPosts, ...data];
      });
      setCurrPageHome((currPage) => ++currPage);
    });
  }, []);

  function fetchMoreData() {
    getGamePage(currPageHome, (data) => {
      setPosts((prevPosts) => {
        return [...prevPosts, ...data];
      });
      setCurrPageHome((currPage) => ++currPage);
    });
  }

  function handleScrollPosition() {
    if (scrollPosition) {
      window.scrollTo(0, scrollPosition);
      setScrollPosition(0);
    }
  }

  function handlePostClick() {
    setScrollPosition(window.pageYOffset);
  }

  const postsContext = {
    homePosts: posts,
    fetchMoreHomePosts: fetchMoreData,
    homeScrollPosition: handleScrollPosition,
    handlePostClick,
  };

  return (
    <PostContext.Provider value={postsContext}>{children}</PostContext.Provider>
  );
}

export default PostsProvider;
