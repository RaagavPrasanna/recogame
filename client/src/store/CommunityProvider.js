import CommunityContext from './community-context';
import { mockCommunityPosts } from '../MockData/MockCommunityPosts';
import { useState } from 'react';

function CommunityProvider({ children }) {
  const [communityPost, setCommunityPost] = useState(mockCommunityPosts);
  const [scrollPosition, setScrollPosition] = useState(0);

  function fetchMoreData() {
    setTimeout(() => {
      setCommunityPost((prevPosts) => {
        return prevPosts.concat(
          Array.from({ length: 2 }).map(() => {
            const id = Math.random();
            return {
              id,
              gameTitle: 'Game Name',
              devName: 'Dev Name',
              review: 'What a great game! It has an impactful story...',
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

  const communityContext = {
    communityPosts: communityPost,
    fetchMoreHomePosts: fetchMoreData,
    homeScrollPosition: handleScrollPosition,
    handlePostClick,
  };

  return (
    <CommunityContext.Provider value={communityContext}>
      {children}
    </CommunityContext.Provider>
  );
}

export default CommunityProvider;