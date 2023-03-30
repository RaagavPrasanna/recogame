import TagsContext from './tags-context';
import { useEffect, useState } from 'react';

async function getTags(type) {
  const resp = await fetch(`/api/game/${type}`);
  if (!resp.ok) {
    throw new Error(`Could not fetch game (${resp.status})`);
  }
  const data = await resp.json();
  return data;
}

function TagsProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [genres, setGenres] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    getTags('categories').then(setCategories);
    getTags('genres').then(setGenres);
    getTags('developers').then(setDevelopers);
    getTags('publishers').then(setPublishers);
    getTags('platforms').then(setPlatforms);
  }, []);

  const tagsContext = {
    categories,
    genres,
    developers,
    publishers,
    platforms,
  };

  return (
    <TagsContext.Provider value={tagsContext}>{children}</TagsContext.Provider>
  );
}

export default TagsProvider;
