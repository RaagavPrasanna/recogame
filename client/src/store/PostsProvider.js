import PostContext from './posts-context';
import UserContext from './user-context';
import { useContext, useEffect, useReducer, useState } from 'react';

// Fetch a set of games based on a given page and invoke a callback function with the data
async function getGamePage(page, params, isLoggedIn, callback) {
  const resp = await fetch(
    `/api/game/feed?page=${page}${params && `&${params}`}`
  );
  if (!resp.ok) {
    throw new Error(`Could not get page (${resp.status})`);
  }

  const data = await resp.json();

  if (isLoggedIn) {
    const thumbs = await getThumbs();
    data.map((g) => {
      g.thumbs =
        Number(thumbs.likes?.includes(g.id)) - Number(thumbs.dislikes?.includes(g.id));
    });
  }
  callback(data);
}

async function getThumbs() {
  // Fetch the CSRF token from the server
  const resp = await fetch('/authentication/csrf-token');
  const { token } = await resp.json();

  // Send the thumb to the server with the CSRF token
  const response = await fetch('/authentication/thumbs/count', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': token,
    }
  });

  if (!response.ok) {
    return {};
  } else {
    return await response.json();
  }
}

// Build tag params based on the tag object
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

// Reducer function for adding and removing tags
function tagsReducer(prevState, action) {
  if (action.type === 'ADD') {
    if (!prevState[action.data.tagType].includes(action.data.tagName)) {
      return {
        ...prevState,
        [action.data.tagType]: [
          ...prevState[action.data.tagType],
          action.data.tagName,
        ],
      };
    }
    return prevState;
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
  const userCtx = useContext(UserContext);

  // Load initial games
  function loadGames() {
    getGamePage(
      0,
      buildTagParams(tags),
      Boolean(userCtx.user),
      (data) => {
        if (data.length < 1) {
          setPosts([]);
          setHasMore(false);
          return;
        }
        setPosts(data);
        setCurrPageHome((currPage) => ++currPage);
      });
  }

  useEffect(() => {
    setCurrPageHome(0);
    setHasMore(true);
    loadGames();
  }, [tags]);

  // Fetches data in the next page
  function fetchMoreData() {
    getGamePage(
      currPageHome,
      buildTagParams(tags),
      Boolean(userCtx.user),
      (data) => {
        // Check if there's more games and add them to posts array
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

  // Sets the window's scroll position based on the saved scroll y value
  function handleScrollPosition() {
    if (scrollPosition) {
      window.scrollTo(0, scrollPosition);
    }
  }

  // Saves the scroll position
  function handlePostClick() {
    // Check if the home component is mounted
    if (isHomeDisplayed) {
      setScrollPosition(window.pageYOffset);
    }
  }

  // Sets boolean value based on whether or not the home component is mounted
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
