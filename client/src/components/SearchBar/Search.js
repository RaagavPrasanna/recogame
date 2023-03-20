import { useState } from 'react';

function Search() {
  const [query, setQuery] = useState('');

  function fetchGames() {

  }

  data.filter((post) => {
    if (query === '') {
      return post;
    } else if (post.title.toLowerCase().includes(query.toLowerCase())) {
      return post;
    }
  })
    .map((post, index) => {
      <div key={index}>
        <p>{post.title}</p>
        <p>{post.author}</p>
      </div>;
    });
}

export default Search;
