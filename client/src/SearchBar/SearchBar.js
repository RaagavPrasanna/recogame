import { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar (){
  // const [query, setQuery] = useState('');
  // TO FIX
  // const data = '0';
  return (
    <div className={styles.search}>
      <input type="search" placeholder="Search Game"/>
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