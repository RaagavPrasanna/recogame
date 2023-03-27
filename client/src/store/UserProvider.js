import UserContext from './user-context';
import { useState } from 'react';

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  async function logout() {
    const res = await fetch('/authentication/logout');
    // TODO: Redirect to home page on logout
    if(res.status === 200) {
      setUser(null);
      return true;
    } else {
      window.location.reload(false);
      window.location.replace(window.location.origin);
    }
  }

  async function setSessionUser() {
    const res = await fetch('/authentication/get-user');
    if(res.status === 200) {
      const data = await res.json();
      setUser({ ...data });
    }
  }

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