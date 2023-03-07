import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import PostsProvider from './store/PostsProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserProvider from './store/UserProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* eslint-disable-next-line no-undef*/}
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <UserProvider>
        <PostsProvider>
          <App />
        </PostsProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
