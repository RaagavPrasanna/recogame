import React from 'react';

const FriendContext = React.createContext({
  friendList: [],
  homeScrollPosition: () => {},
});

export default FriendContext;
