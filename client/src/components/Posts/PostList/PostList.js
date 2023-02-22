import { useState } from 'react';
import GamePost from '../GamePost/GamePost';
import { mockGamePosts } from '../../../MockData/MockGamePosts';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './PostList.module.css';
import Spinner from '../../UI/Spinner';

function PostList() {
  const [posts, setPosts] = useState(mockGamePosts);

  function fetchMoreData() {
    setTimeout(() => {
      setPosts((prevPosts) => {
        return prevPosts.concat(
          Array.from({ length: 2 }).map(() => {
            const id = Math.random();
            return {
              id,
              gameTitle: 'Game Name',
              devName: 'Dev Name',
              description:
                // eslint-disable-next-line max-len
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              rating: 5,
            };
          })
        );
      });
    }, 1500);
  }

  const availablePosts = posts.map((post) => {
    return (
      <GamePost
        id={post.id}
        key={post.id}
        gameTitle={post.gameTitle}
        devName={post.devName}
        description={post.description}
        rating={post.rating}
      />
    );
  });

  return (
    <div className={styles.postList} style={{ marginTop: '20px' }}>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<Spinner />}
        className={styles.infiniteScroll}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        refreshFunction={fetchMoreData}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        }
      >
        {availablePosts}
      </InfiniteScroll>
    </div>
  );
}

export default PostList;
