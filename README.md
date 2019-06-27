# React-Redux-Thunk (Crash course)

Traversy Media on You tube

## Package Set-up

npx create-react-app my-app
npm i redux react-redux redux-thunk -- save
or
yarn add redux react-redux redux-thunk

Error debugging: npm install if it does not work the first time

install react and redux chrome extentions and command/alt/i (mac) to see console for debugging

connect redux chrome extension in store

### connect redux chrome extension to store (53:00) to (55:00)

```
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
```

## File-structure

Steps

1. Create React Components
2. Create store with initial state and import redux middleware, store and other redux library dependencies, import the reducer files that will replicate initial state and dispatch actions to components
3.

#### Components

Map payloads as props to the store via creator actions (action payloads) and listen for change and receive redcuers (changed state payloads)

postsform.js
posts.js

#### Actions

Creator actions - payloads that go from the components to store via map functions (mapStateToProps, mapDispatchToProps )

postActions.js
types.js

#### Reducer

Dispatch actions - payloads change state in the store and dispatch the changed (reduced) payload back to the component

index.js - to store constants
postReducers.js - for the reducer functions to dispatch payload back to the component

#### Store

Holds immutable state, recieves creator actions from component, state replicated and reduced via reducer actions (switch statements) and dispatched back to the component

## React components

In posts.js set up initial files with a class based component (use snippet rcc)

#### posts.js

```
import React, { Component } from 'react';

class Posts extends Component {
  render() {
    return (
      <div>
        <h1>Posts</h1>
      </div>
    );
  }
}
export default Posts;
```

Fetch API data with life-cycle method, componentWillMount

```
class Posts extends Component {
  componentWillMount() {
    console.log('console will mount test');
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => console.log(data));
  }

```

set state (10:25 to 13:00) and map through the data to render data in state

create constructor and set state to an empty array

```
class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
```

refactor the componentWillMount to reflect state

```
  componentWillMount() {
    console.log('console will mount test');
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      //   .then(data => console.log(data)); refactor to state
      .then(data => this.setState({ posts: data }));
  }
```

map the data into the render method - use the fields you require from the API - title/ body in this case

```
  render() {
    const postItems = this.state.posts.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
```

return method should now have the map functon as a prop from the constant postItems intialised in the render method

```
 return (
     <div>
       <h1>Posts</h1>
       {postItems}
     </div>
   );
 }
}
export default Posts;
```

#### postsform.js

create another class-based component (13:40-14:21)

```
import React, { Component } from 'react';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <h1>Add Post</h1>
      </div>
    );
  }
}
export default PostForm;
```

import it into app.js (remove the logo.svg file and in App.css
remove all the css add very basic css

```
.App {
  width: 90%;
  margin: auto;
}
```

In the main app break the page with a hr tag

```
import React from 'react';
import './App.css';
import Posts from './components/posts';
import PostForm from './components/postform';
function App() {
  return (
    <div className='App'>
      <PostForm />
      <hr />
      <Posts />
    </div>
  );
}
```

set state in the form to empty strings(14:21 - 17:20)

```
class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
  }
```

Create jsx return method/ pass state into the value field

```
render() {
  return (
    <div>
      <h1>Add Post</h1>
      <form>
        <div>
          <label>Title</label>
          <input type='text' name='title' value={this.state.title} />
        </div>
        <br />
        <div>
          <label>Body</label>
          <textarea type='text' name='body' value={this.state.body} />
        </div>
        <br />
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}
}
export default PostForm;
```

set up the onChange (17:20) and onSubmit (20:27) event handlers and post data via the API call

```
<!--Bind event handlers in state object  -->
   onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
<!-- Write event handler functions -->
  onSubmit(event) {
    event.preventDefault();
    const post = {
      title: this.state.title,
      body: this.state.body
    };
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(post)
    })
      .then(res => res.json())
      .then(data => console.log(data));
  }
  <!-- Add handlers in form render method-->
render() {
    return (
      <div>
        <h1>Add Post</h1>
        <form name='add-post' onSubmit={this.onSubmit}>
          <div>
            <label>Title</label>
            <input
              type='text'
              name='title'
              value={this.state.title}
              onChange={this.onChange}
            />
          </div>
          <br />
          <div>
            <label>Body</label>
            <textarea
              type='text'
              name='body'
              value={this.state.body}
              onChange={this.onChange}
            />
          </div>
          <br />
          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
export default PostForm;
```

## Adding redux to the project (23:00 - 30:00 )

import the library into the main app

```
import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import Posts from './components/posts';
import PostForm from './components/postform';

const store = createStore(() => [], {}, applyMiddleware());

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
```

##### create store.js

import libraries
intialise initial state, store, middleware
import reducers files - create folder called reducers with index.js file

```
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
```

##### create actions and reducers files (33:36) to (50:51)

#### set up actions (creator payloads)

index.js

```
export const FETCH_POSTS = 'FETCH_POSTS';
export const NEW_POST = 'NEW_POST';
```

postActions.js

- move the react API calls from react components here import the index constants, test the fetch action working with a console log

```
import { FETCH_POSTS, NEW_POST } from './types';

export const fetchPosts = () => dispatch => {
  console.log('test fetch request');
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts =>
      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    );
};
```

#### set up reducers (dispatch payloads)

postReducer.js

- take state out of the react component and replicate it with a reducer switch statement - the switch statement outlines the cases and the default action

```
import { FETCH_POSTS, NEW_POST } from '../actions/types';
import { bindActionCreators } from 'redux';

const initialState = {
  items: [],
  item: {}
};
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      console.log('reducer working');
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
```

index.js

- set up the index for the reducers, importing libraries and files for connectivity to store, actions and components

```
import { combineReducers } from 'redux';
import postReducer from './postReducer';

export default combineReducers({
  posts: postReducer
});
```

test the reducers are working with a console log

At this stage the files will compile with errors as the NEW_POST is defined but not used.
But the posts will be fetched from the API and will be rendered

### Import prop types (51 - 53)

import from redux library at the top of the components (posts.js)

```
import { PropTypes } from 'prop-types';
```

check in the redux extension on chrome to ensure that state has been mapped from store

Pass the prop types into the component

```
Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired
};

```

#### repeat action-store-reducer steps for new post (57:00 to end)

remove fetch from react component - set up creator action

```
export const createPosts = postData => dispatch => {
  console.log('test create request');
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
    .then(res => res.json())
    .then(post =>
      dispatch({
        type: NEW_POST,
        payload: postData
      })
    );
};
```

set up reducer action update switch statement with new case before the default action of returning state

```
 case NEW_POST:
      return {
        ...state,
        // item is the single item of new post in state
        item: action.payload
      };
```

connect the store to the react component - import connect/ PropTypes and the action prop from redux action file

```
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createPost } from '../actions/postActions';
```

wrap the connect to the export function to connect store with the action

```
export default connect(
  null,
  { createPost }
)(PostForm);
```

pass proptypes imported into the component

```
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createPost } from '../actions/postActions';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const post = {
      title: this.state.title,
      body: this.state.body
    };

    // remove fetch and move to creator action for new post call in as a prop
    this.props.createPost(post);
  }

  render() {
    return (
      <div>
        <h1>Add Post</h1>
        <form name='add-post' onSubmit={this.onSubmit}>
          <div>
            <label>Title</label>
            <input
              type='text'
              name='title'
              value={this.state.title}
              onChange={this.onChange}
            />
          </div>
          <br />
          <div>
            <label>Body</label>
            <textarea
              type='text'
              name='body'
              value={this.state.body}
              onChange={this.onChange}
            />
          </div>
          <br />
          <div>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
PostForm.propTypes = {
  createPost: PropTypes.func.isRequired
};
export default connect(
  null,
  { createPost }
)(PostForm);
```

Add the react lifecycle method
componentWillReceiveProps - in the props component, connect store and propTypes from redux library

You can now pass the props from store, connect store to the components, and run the lifecycle method.

```
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';

class Posts extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }
  // push will add it to the end
  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost);
    }
  }
  render() {
    const postItems = this.props.posts.map(post => (
      <div key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
    return (
      <div>
        <h1>Posts</h1>
        {postItems}
      </div>
    );
  }
}
Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object
};
const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item
});
export default connect(
  mapStateToProps,
  { fetchPosts }
)(Posts);
```
