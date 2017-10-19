import { combineReducers } from 'redux';
import postsReducer from './posts';
import categoriesReducer from './categories';
import commentsReducer from './comments';

const rootReducer = combineReducers({
  posts: postsReducer,
  categories: categoriesReducer,
  comments: commentsReducer
});

export default rootReducer;
