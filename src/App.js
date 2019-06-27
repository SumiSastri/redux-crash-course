import React from 'react';
import './App.css';
import { Provider } from 'react-redux';

import Posts from './components/posts';
import PostForm from './components/postform';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <PostForm />
        <hr />
        <Posts />
      </div>
    </Provider>
  );
}

export default App;
