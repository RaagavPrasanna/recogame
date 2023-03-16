import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './SearchBar.module.css';

function SearchBar() {
  const { t } = useTranslation();
  // const [query, setQuery] = useState('');
  // TO FIX
  // const data = '0';
  return (
    <div className={styles.search}>
      <input type='search' placeholder={t('Search')} />
      {/* {
        data.filter(post => {
          if (query === '') {
            return post;
          } else if (post.title.toLowerCase().includes(query.toLowerCase())) {
            return post;
          }
        }).map((post, index) => {
          <div key={index}>
            <p>{post.title}</p>
            <p>{post.author}</p>
          </div>;
        })
      } */}
    </div>
  );
}

export default SearchBar;