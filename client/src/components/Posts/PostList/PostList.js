import { useState } from 'react';
import GamePost from '../GamePost/GamePost';
import { mockGamePosts } from '../../../MockData/MockGamePosts';

function PostList() {
  const [posts, setPosts] = useState(mockGamePosts);

  const availablePosts = posts.map((post, i) => {
    return (
      <GamePost
        key={i}
        gameTitle={post.gameTitle}
        devName={post.devName}
        review={post.review}
        rating={post.rating}
      />
    );
  });

  return <ul>{availablePosts}</ul>;
}

export default PostList;
