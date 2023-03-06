import PostContext from './posts-context';
import { useEffect, useState } from 'react';

function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  // TODO: Add separate scoll position states for each page
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    fetch('/api/game-all')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: (${res.status})`);
        } else {
          return res.json();
        }
      })
      .then((data) =>
        setPosts(
          data.map((game, index) => {
            return { ...game, id: index, rating: 5, price: 69.99 };
          })
        )
      )
      .catch((err) => console.error(err.message));
  }, []);

  function fetchMoreData() {
    setTimeout(() => {
      setPosts((prevPosts) => {
        return prevPosts.concat(
          Array.from({ length: 2 }).map(() => {
            const id = Math.random();
            return {
              id,
              name: 'Game Name',
              devName: 'Dev Name',
              imageHeader:
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
              shortDescription:
                // eslint-disable-next-line max-len
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              rating: 5,
              price: 79.99,
            };
          })
        );
      });
    }, 1500);
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
