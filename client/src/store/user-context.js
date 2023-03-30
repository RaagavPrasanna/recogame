import React from 'react';

// Initialize Context
const UserContext = React.createContext({
  user: null,
  setUser: () => {},
  logout: () => {},
  setSessionUser: async () => {},
});

export default UserContext;