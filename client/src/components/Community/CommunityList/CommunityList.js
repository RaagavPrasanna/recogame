import { useContext, useEffect } from 'react';
import CommunityPost from '../CommunityPost/CommunityPost';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './CommunityList.module.css';
import Spinner from '../../UI/Spinner';
import CommunityContext from '../../../store/community-context';
import { useTranslation } from 'react-i18next';

function CommunityList() {
  const commCtx = useContext(CommunityContext);
  const { t } = useTranslation();

  useEffect(() => {
    commCtx.commMounted(true);
    commCtx.homeScrollPosition();

    return commCtx.commMounted.bind(null, false);
  }, []);

  const availablePosts = commCtx.communityPosts.map((post) => {
    return (
      <CommunityPost
        id={post.id}
        key={post.id}
        gameTitle={post.gameTitle}
        devName={post.devName}
        review={post.review}
        rating={post.rating}
        onGameClick={commCtx.handlePostClick}
      />
    );
  });

  return (
    <div className={styles.communityList}>
      <InfiniteScroll
        dataLength={commCtx.communityPosts.length}
        next={commCtx.fetchMoreHomePosts}
        hasMore={true}
        loader={<Spinner />}
        className={styles.infiniteScroll}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        refreshFunction={commCtx.fetchMoreHomePosts}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8595; {t('Pull down to refresh')}</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8593; {t('Release to refresh')}</h3>
        }
      >
        {availablePosts}
      </InfiniteScroll>
    </div>
  );
}

export default CommunityList;
