import FriendContext from './friend-context';
import { mockFriendList } from '../MockData/MockFriendList';
import { useState } from 'react';

function FriendsProvider({ children }) {
  const friends = useState(mockFriendList);
  const [scrollPosition, setScrollPosition] = useState(0);

  function handleScrollPosition() {
    if (scrollPosition) {
      window.scrollTo(0, scrollPosition);
      setScrollPosition(0);
    }
  }

  const friendsContext = {
    friendList: friends,
    homeScrollPosition: handleScrollPosition,
  };

  return (
    <FriendContext.Provider value={friendsContext}>{children}</FriendContext.Provider>
  );
}

export default FriendsProvider;
