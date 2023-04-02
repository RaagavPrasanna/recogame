import styles from './Tag.module.css';
import { BsXSquare } from 'react-icons/bs';
import { useContext } from 'react';
import PostContext from '../../store/posts-context';
import { useNavigate } from 'react-router-dom';

function Tag({ tagName, closable, tagType }) {
  const postCtx = useContext(PostContext);
  const navigate = useNavigate();

  function tagClickHandler(e) {
    e.preventDefault();
    // eslint-disable-next-line curly
    if (closable) return;

    // Add tag to tags array in the Context Object
    postCtx.dispatchTags({ type: 'ADD', data: { tagName, tagType } });

    // Navigate to homepage and scroll to the top
    navigate('/');
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }

  // Removes tag from the tags array in the Context Object
  function tagRemoveHandler(e) {
    e.preventDefault();
    postCtx.dispatchTags({ type: 'REMOVE', data: { tagName, tagType } });
  }

  return (
    <div className={styles.tag} onClick={tagClickHandler}>
      {`${tagName}`}
      {closable && (
        <span className={styles.close} onClick={tagRemoveHandler}>
          <BsXSquare />
        </span>
      )}
    </div>
  );
}

export default Tag;
