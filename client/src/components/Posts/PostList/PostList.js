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
    post.id ||= Math.random();
    return (
      <GamePost
        id={post.id}
        key={post.id}
        imageSrc={
          post?.imageHeader ||
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        }
        gameTitle={post?.name || 'Game Name'}
        devName={post?.developers.map((d, i) => <div key={i}>{d}</div>) || 'Developer Name'}
        description={post?.shortDescription || 'No Description.'}
        rating={post?.rating || 5}
        onGameClick={postsCtx.handlePostClick}
      />
    );
  });

  return (
    <div className={styles.postList}>
      <InfiniteScroll
        dataLength={postsCtx.homePosts.length}
        next={postsCtx.fetchMoreHomePosts}
        hasMore={postsCtx.hasMore}
        loader={<Spinner />}
        className={styles.infiniteScroll}
        endMessage={
          <div className={styles['end-message']}>
            <p>Yay! You have seen it all</p>
          </div>
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
