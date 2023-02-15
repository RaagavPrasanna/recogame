import { useState } from 'react';
import GamePost from '../GamePost/GamePost';
import { mockGamePosts } from '../../../MockData/MockGamePosts';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './PostList.module.css';
import useWindowDimensions from '../../../Hooks/DimensionHook';
import Spinner from '../../UI/Spinner';

function PostList() {
  const [posts, setPosts] = useState(mockGamePosts);
  const { height } = useWindowDimensions();

  function fetchMoreData() {
    setTimeout(() => {
      setPosts((prevPosts) => {
        return prevPosts.concat(
          Array.from({ length: 20 }).map(() => {
            return {
              gameTitle: 'Game Name',
              devName: 'Dev Name',
              review:
                // eslint-disable-next-line max-len
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              rating: 5,
            };
          })
        );
      });
    }, 1500);
  }

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

  return (
    <div className={styles.postList}>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<Spinner />}
        height={height * 0.8}
      >
        {availablePosts}
      </InfiniteScroll>
    </div>
  );
}

export default PostList;
