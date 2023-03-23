import styles from './Tag.module.css';
import { BsXSquare } from 'react-icons/bs';
import { useContext } from 'react';
import PostContext from '../../store/posts-context';

function Tag({ tagName, closable, tagType }) {
  const postCtx = useContext(PostContext);

  function tagClickHandler() {
    // eslint-disable-next-line curly
    if (closable) return;
    postCtx.setPosts([]);
    postCtx.dispatchTags({ type: 'ADD', data: { tagName, tagType } });

    if (!postCtx.homeMounted) {
      postCtx.setCurrPageHome(0);
    }
  }

  return (
    <div className={styles.tag} onClick={tagClickHandler}>
      {`${tagName}`}
      {closable && (
        <span className={styles.close}>
          <BsXSquare />
        </span>
      )}
    </div>
  );
}

export default Tag;
