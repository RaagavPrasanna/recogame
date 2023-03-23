import styles from './Tag.module.css';
import { BsXSquare } from 'react-icons/bs';
import { useContext } from 'react';
import PostContext from '../../store/posts-context';

function Tag({ tagName, closable, tagType }) {
  const postCtx = useContext(PostContext);

  function tagClickHandler(e) {
    e.preventDefault();
    // eslint-disable-next-line curly
    if (closable) return;
    postCtx.setPosts([]);
    postCtx.dispatchTags({ type: 'ADD', data: { tagName, tagType } });
    postCtx.setCurrPageHome(0);
  }

  function tagRemoveHandler(e) {
    e.preventDefault();
    postCtx.setPosts([]);
    postCtx.dispatchTags({ type: 'REMOVE', data: { tagName, tagType } });
    postCtx.setCurrPageHome(0);
  }

  return (
    <div className={styles.tag} onClick={tagClickHandler}>
      {`${tagName}`}
      {true && (
        <span className={styles.close} onClick={tagRemoveHandler}>
          <BsXSquare />
        </span>
      )}
    </div>
  );
}

export default Tag;
