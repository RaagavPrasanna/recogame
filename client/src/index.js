import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import PostsProvider from './store/PostsProvider';
import FriendProvider from './store/FriendsProvider';
import CommunityProvider from './store/CommunityProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserProvider from './store/UserProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    {/* eslint-disable-next-line no-undef*/}
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <UserProvider>
        <PostsProvider>
          <FriendProvider>
            <CommunityProvider>
              <App />
            </CommunityProvider>
          </FriendProvider>
        </PostsProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  </>
);
