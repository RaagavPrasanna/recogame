import { useContext, useEffect } from 'react';
import GamePost from '../GamePost/GamePost';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './PostList.module.css';
import Spinner from '../../UI/Spinner';
import PostContext from '../../../store/posts-context';

function PostList() {
  const postsCtx = useContext(PostContext);

  useEffect(() => {
    postsCtx.homeScrollPosition();
  }, []);

  const availablePosts = postsCtx.homePosts.map((post) => {
    return (
      <GamePost
        id={post.id}
        key={post.id}
        gameTitle={post.gameTitle}
        devName={post.devName}
        description={post.description}
        rating={post.rating}
        onGameClick={postsCtx.handlePostClick}
      />
    );
  });

  return (
    <div className={styles.postList}>
      <InfiniteScroll
        dataLength={postsCtx.homePosts.length}
        next={postsCtx.fetchMoreHomePosts}
        hasMore={true}
        loader={<Spinner />}
        className={styles.infiniteScroll}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        refreshFunction={postsCtx.fetchMoreHomePosts}
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
