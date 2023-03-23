import PostContext from './posts-context';
import { useEffect, useReducer, useState } from 'react';

async function getGamePage(page, params, callback) {
  console.log(`/api/game/feed?page=${page}${params && `&${params}`}`);
  const resp = await fetch(
    `/api/game/feed?page=${page}${params && `&${params}`}`
  );
  if (!resp.ok) {
    throw new Error(`Could not get page (${resp.status})`);
  }
  const data = await resp.json();
  callback(data);
}

function buildTagParams(tagObj) {
  return (
    Object.entries(tagObj)
      // eslint-disable-next-line no-unused-vars
      .filter(([_, tags]) => tags.length)
      .map(([type, tags]) => `${type}=${tags.join(',')}`)
      .join('&')
  );
}

const initialTagState = {
  categories: ['Multi-player', 'Online PvP'],
  genres: ['Indie', 'Casual'],
  developers: [],
  publishers: [],
  platforms: ['windows'],
};

function tagsReducer(prevState, action) {
  if (action.type === 'CATEGORY') {
    return { categories: [...prevState.categories, ...action.data] };
  }
  return initialTagState;
}

function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currPageHome, setCurrPageHome] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isHomeDisplayed, setIsHomeDisplayed] = useState(false);
  const [tags, dispatchTags] = useReducer(tagsReducer, initialTagState);

  useEffect(() => {
    getGamePage(currPageHome, buildTagParams(tags), (data) => {
      setPosts((prevPosts) => {
        return [...prevPosts, ...data];
      });
      setCurrPageHome((currPage) => ++currPage);
    });
  }, []);

  function fetchMoreData() {
    getGamePage(currPageHome, buildTagParams(tags), (data) => {
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
    tags,
    dispatchTags,
    setCurrPageHome,
  };

  return (
    <PostContext.Provider value={postsContext}>{children}</PostContext.Provider>
  );
}

export default PostsProvider;
