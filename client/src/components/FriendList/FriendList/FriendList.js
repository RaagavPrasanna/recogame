import { useContext, useEffect } from 'react';
import FriendPost from '../FriendPost/FriendPost';
import FriendsContext from '../../../store/friend-context';
import classes from './FriendList.module.css';


function FriendList() {
  const friendCtx = useContext(FriendsContext);

  useEffect(() => {
    friendCtx.homeScrollPosition();
  }, []);

  const friends = friendCtx.friendList.map((friend) => {
    return <FriendPost key={friend.id} name={friend.name} />;
  });

  return (
    <div className={classes.friendList}>
      <br />
      <br />
      <br />
      {friends}
    </div>
  );

}

export default FriendList;
