import GamePost from '../GamePost/GamePost';

function PostList({ posts }) {
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
