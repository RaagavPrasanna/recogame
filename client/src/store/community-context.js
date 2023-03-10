import React from 'react';

const CommunityContext = React.createContext({
  communityPosts: [],
  fetchMoreHomePosts: () => {},
  homeScrollPosition: () => {},
  handlePostClick: () => {},
  isCommDisplayed: () => {},
});

export default CommunityContext;
