import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import PostsProvider from './store/PostsProvider';
import FriendProvider from './store/FriendsProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PostsProvider>
      <FriendProvider>
        <App />
      </FriendProvider>
    </PostsProvider>
  </React.StrictMode>
);
