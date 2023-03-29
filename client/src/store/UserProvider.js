import UserContext from './user-context';
import { useState } from 'react';

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Function to logout user
  async function logout() {
    const res = await fetch('/authentication/logout');
    if(res.status === 200) {
      setUser(null);
      return true;
    } else {
      window.location.reload(false);
      window.location.replace(window.location.origin);
    }
  }

  // Sets the user session from the backend
  async function setSessionUser() {
    const res = await fetch('/authentication/get-user');
    if(res.status === 200) {
      const data = await res.json();
      setUser({ ...data });
    }
  }

  // Context object
  const userContext = {
    user: user,
    setUser: setUser,
    logout: logout,
    setSessionUser: setSessionUser
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
}