import { useContext, useEffect, useState } from 'react';
import PostList from './components/Posts/PostList/PostList';
import Tag from './components/Tag/Tag';
import PostContext from './store/posts-context';
import styles from './Home.module.css';

function Home() {
  const postCtx = useContext(PostContext);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // Inform PostProvider that the Home component is mounted
    postCtx.homeMounted(true);

    // Populate tags array based on available tags in the Context object
    setTags(() => {
      const newTags = [];
      Object.entries(postCtx.tags).forEach(([type, tags]) => {
        tags.forEach((tag) => {
          newTags.push({ type, tag });
        });
      });
      return newTags;
    });

    // Inform PostProvider that the Home component is being dismounted
    return postCtx.homeMounted.bind(null, false);
  }, [postCtx.tags]);

  function displayTags() {
    return (
      <div className={styles.tags}>
        {tags.map((tag, i) => {
          return (
            <Tag key={i} closable={true} tagType={tag.type} tagName={tag.tag} />
          );
        })}
      </div>
    );
  }

  return (
    <>
      {displayTags()}
      <PostList />
    </>
  );
}

export default Home;
