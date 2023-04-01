import { useContext, useEffect } from 'react';
import GamePost from '../GamePost/GamePost';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './PostList.module.css';
import Spinner from '../../UI/Spinner';
import PostContext from '../../../store/posts-context';
import { useTranslation } from 'react-i18next';

function PostList() {
  const postsCtx = useContext(PostContext);
  const { t } = useTranslation();

  useEffect(() => {
    postsCtx.homeScrollPosition();
  }, []);

  const availablePosts = postsCtx.homePosts.map((post) => {
    return (
      <GamePost
        id={post.id}
        key={post.id}
        imageSrc={post?.imageHeader}
        gameTitle={post?.name || 'Game Name'}
        devName={
          post?.developers.map((d, i) => <div key={i}>{d}</div>) ||
          'Developer Name'
        }
        description={post?.shortDescription || 'No Description.'}
        rating={post?.rating || 5}
        likes={post.likes}
        dislikes={post.dislikes}
        thumbs={post.thumbs}
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
            <p>{t('Yay! You have seen it all')}</p>
          </div>
        }
        refreshFunction={postsCtx.fetchMoreHomePosts}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 className={styles['pull-down']} style={{ textAlign: 'center' }}>
            &#8595; {t('Pull down to refresh')}
          </h3>
        }
        releaseToRefreshContent={
          <h3 className={styles['release']} style={{ textAlign: 'center' }}>
            &#8593; {t('Release to refresh')}
          </h3>
        }
      >
        {availablePosts}
      </InfiniteScroll>
    </div>
  );
}

export default PostList;
