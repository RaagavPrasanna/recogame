import { useState } from 'react';
import styles from './SearchBar.module.css';
import Search from './Search';

function SearchBar (){
  return (
    <div className={styles.search}>
      <input type="search" placeholder="Search Game"/>
      <Search />
    </div>
  );
}

export default SearchBar;