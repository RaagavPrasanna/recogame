import styles from './Filter.module.css';
import Modal from '../UI/Modal/Modal';
import { useContext } from 'react';
import PostContext from '../../store/posts-context';
import TagsContext from '../../store/tags-context';

function Filter({ handleShow }) {
  const tagsCtx = useContext(TagsContext);
  const postCtx = useContext(PostContext);

  function addTag(e) {
    const tag = e.target.value;
    const type = e.target.className;
    postCtx.dispatchTags({
      type: 'ADD',
      data: { tagName: tag, tagType: type },
    });
    window.scrollTo(0, 0);
    handleShow();
  }

  return (
    <Modal onClick={handleShow}>
      <h1 className={styles.title}>Filter</h1>
      <div className={styles['filter-container']}>
        <div className={styles.categories}>
          <label htmlFor="categories">Category:</label>
          <select name="categories" id="categories">
            {tagsCtx.categories.map((cat, i) => {
              return (
                <option
                  key={i}
                  value={cat}
                  className="categories"
                  onClick={addTag}
                >
                  {cat}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.genres}>
          <label htmlFor="genres">Genre:</label>
          <select name="genres" id="genres">
            {tagsCtx.genres.map((genre, i) => {
              return (
                <option
                  key={i}
                  value={genre}
                  className="genres"
                  onClick={addTag}
                >
                  {genre}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.developers}>
          <label htmlFor="developers">Developer:</label>
          <select name="developers" id="developers">
            {tagsCtx.developers.map((dev, i) => {
              return (
                <option
                  key={i}
                  value={dev}
                  className="developers"
                  onClick={addTag}
                >
                  {dev}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.publishers}>
          <label htmlFor="publishers">Publisher:</label>
          <select name="publishers" id="publishers">
            {tagsCtx.publishers.map((pub, i) => {
              return (
                <option
                  key={i}
                  value={pub}
                  className="publishers"
                  onClick={addTag}
                >
                  {pub}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.platforms}>
          <label htmlFor="platforms">Platform:</label>
          <select name="platforms" id="platforms">
            {tagsCtx.platforms.map((plat, i) => {
              return (
                <option
                  key={i}
                  value={plat}
                  className="platforms"
                  onClick={addTag}
                >
                  {plat}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </Modal>
  );
}

export default Filter;
