import React from 'react';

const UserContext = React.createContext({
  user: null,
  setUser: () => {},
  logout: () => {},
  setSessionUser: () => {},
});

export default UserContext;