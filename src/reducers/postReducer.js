import { FETCH_POSTS, NEW_POST } from '../actions/types';
// import { bindActionCreators } from 'redux';

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
    case NEW_POST:
      return {
        ...state,
        // item is the single item of new post in state
        item: action.payload
      };

    default:
      return state;
  }
}
