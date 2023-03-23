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
  categories: [],
  genres: [],
  developers: [],
  publishers: [],
  platforms: [],
};

function tagsReducer(prevState, action) {
  if (action.type === 'ADD') {
    return {
      ...prevState,
      [action.data.tagType]: [
        ...prevState[action.data.tagType],
        action.data.tagName,
      ],
    };
  }
  if (action.type === 'REMOVE') {
    return {
      ...prevState,
      [action.data.tagType]: [
        ...prevState[action.data.tagType].filter(
          (tag) => tag !== action.data.tagName
        ),
      ],
    };
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

  function loadGames() {
    getGamePage(0, buildTagParams(tags), (data) => {
      setPosts(data);
      setCurrPageHome((currPage) => ++currPage);
    });
  }

  useEffect(() => {
    setCurrPageHome(0);
    loadGames();
  }, [tags]);

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
    setPosts,
    loadGames,
  };

  return (
    <PostContext.Provider value={postsContext}>{children}</PostContext.Provider>
  );
}

export default PostsProvider;
