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
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currPageHome, setCurrPageHome] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isHomeDisplayed, setIsHomeDisplayed] = useState(false);

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
      if (data.length > 0) {
        setHasMore(true);
        setPosts((prevPosts) => {
          return [...prevPosts, ...data];
        });
        setCurrPageHome((currPage) => ++currPage);
      } else {
        setHasMore(false);
      }
    });
  }

  function handleScrollPosition() {
    if (scrollPosition) {
      window.scrollTo(0, scrollPosition);
    }
  }

  function handlePostClick() {
    if (isHomeDisplayed) {
      setScrollPosition(window.pageYOffset);
    }
  }

  function homeMounted(isHomeMounted) {
    setIsHomeDisplayed(isHomeMounted);
  }

  const postsContext = {
    homePosts: posts,
    fetchMoreHomePosts: fetchMoreData,
    homeScrollPosition: handleScrollPosition,
    handlePostClick,
    homeMounted,
    hasMore,
  };

  return (
    <PostContext.Provider value={postsContext}>{children}</PostContext.Provider>
  );
}

export default PostsProvider;
