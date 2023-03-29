import React from 'react';

const PostContext = React.createContext({
  homePosts: [],
  fetchMoreHomePosts: () => {},
  homeScrollPosition: () => {},
  handlePostClick: () => {},
  homeMounted: () => {},
  hasMore: true,
  tags: [],
  dispatchTags: () => {},
  setCurrPageHome: () => {},
  setPosts: () => {},
  loadGames: () => {},
});

export default PostContext;
