import React from 'react';

const PostContext = React.createContext({
  homePosts: [],
  fetchMoreHomePosts: () => {},
});

export default PostContext;
