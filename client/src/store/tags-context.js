import React from 'react';

const TagsContext = React.createContext({
  categories: {},
  genres: {},
  developers: {},
  publishers: {},
  platforms: {},
});

export default TagsContext;