import PostContext from './posts-context';
import { mockGamePosts } from '../MockData/MockGamePosts';
import { useState } from 'react';

function PostsProvider({ children }) {
  const [posts, setPosts] = useState(mockGamePosts);
  // TODO: Add separate scoll position states for each page
  const [scrollPosition, setScrollPosition] = useState(0);

  function fetchMoreData() {
    setTimeout(() => {
      setPosts((prevPosts) => {
        return prevPosts.concat(
          Array.from({ length: 2 }).map(() => {
            const id = Math.random();
            return {
              id,
              gameTitle: 'Game Name',
              devName: 'Dev Name',
              description:
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
      window.scrollTo(0, parseInt(scrollPosition));
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
