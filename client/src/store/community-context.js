import React from 'react';

const CommunityContext = React.createContext({
  communityPosts: [],
  fetchMoreHomePosts: () => {},
  homeScrollPosition: () => {},
  handlePostClick: () => {},
  commMounted: () => {},
});

export default CommunityContext;
