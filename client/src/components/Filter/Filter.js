import styles from './Filter.module.css';
import Modal from '../UI/Modal/Modal';
import { useContext } from 'react';
import PostContext from '../../store/posts-context';
import TagsContext from '../../store/tags-context';
import { useTranslation } from 'react-i18next';

function Filter({ handleShow }) {
  const tagsCtx = useContext(TagsContext);
  const postCtx = useContext(PostContext);
  const { t } = useTranslation();

  // Add a tag to the tags array in the Context Provider
  function addTag(e) {
    // Get values from selected tag element
    const tag = e.target.value;
    const type = e.target.id;

    // Invoke dispatcher with tag data
    postCtx.dispatchTags({
      type: 'ADD',
      data: { tagName: tag, tagType: type },
    });

    // Scroll to the top of screen and hide filter component
    window.scrollTo(0, 0);
    handleShow();
  }

  return (
    <Modal onClick={handleShow}>
      <h1 className={styles.title}>{t('Filter')}</h1>
      <div className={styles['filter-container']}>
        <div className={styles.categories}>
          <label htmlFor="categories">{t('CATEGORIES')}</label>
          <select name="categories" id="categories" onChange={addTag}>
            {tagsCtx.categories.map((cat, i) => {
              return (
                <option
                  key={i}
                  value={cat}
                  className="categories"
                >
                  {cat}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.genres}>
          <label htmlFor="genres">{t('GENRE')}</label>
          <select name="genres" id="genres" onChange={addTag}>
            {tagsCtx.genres.map((genre, i) => {
              return (
                <option
                  key={i}
                  value={genre}
                  className="genres"
                >
                  {genre}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.developers}>
          <label htmlFor="developers">{t('DEVELOPER')}</label>
          <select name="developers" id="developers" onChange={addTag}>
            {tagsCtx.developers.map((dev, i) => {
              return (
                <option
                  key={i}
                  value={dev}
                  className="developers"
                >
                  {dev}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.publishers}>
          <label htmlFor="publishers">{t('PUBLISHER')}</label>
          <select name="publishers" id="publishers" onChange={addTag}>
            {tagsCtx.publishers.map((pub, i) => {
              return (
                <option
                  key={i}
                  value={pub}
                  className="publishers"
                >
                  {pub}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.platforms}>
          <label htmlFor="platforms">{t('PLATFORMS')}</label>
          <select name="platforms" id="platforms" onChange={addTag}>
            {tagsCtx.platforms.map((plat, i) => {
              return (
                <option
                  key={i}
                  value={plat}
                  className="platforms"
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
