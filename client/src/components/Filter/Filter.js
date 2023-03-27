import styles from './Filter.module.css';
import Modal from '../UI/Modal/Modal';
import { useContext, useEffect, useState } from 'react';
import PostContext from '../../store/posts-context';

async function getTags(type) {
  const resp = await fetch(`/api/game/${type}`);
  if (!resp.ok) {
    throw new Error(`Could not fetch game (${resp.status})`);
  }
  const data = await resp.json();
  return data;
}

function Filter({ handleShow }) {
  const [categories, setCategories] = useState([]);
  const [genres, setGenres] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const postCtx = useContext(PostContext);

  useEffect(() => {
    getTags('categories').then(setCategories);
    getTags('genres').then(setGenres);
    getTags('developers').then(setDevelopers);
    getTags('publishers').then(setPublishers);
    getTags('platforms').then(setPlatforms);
  }, []);

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
    <Modal className={styles['filter-container']} onClick={handleShow}>
      <label htmlFor="categories">Category:</label>
      <select name="categories" id="categories">
        {categories.map((cat, i) => {
          return (
            <option key={i} value={cat} className="categories" onClick={addTag}>
              {cat}
            </option>
          );
        })}
      </select>
    </Modal>
  );
}

export default Filter;
