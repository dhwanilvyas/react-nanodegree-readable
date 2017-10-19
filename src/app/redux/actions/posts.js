import axios from 'axios';
import {
  POSTS_AVAILABLE
} from './types';

export function getPosts(category) {
  return function(dispatch) {
    let promise = axios.get('posts');
    if (category) promise = axios.get(category + '/posts');

    promise
      .then(response => {
        dispatch(postsAvailable(response));
      })
      .catch(err => {
        dispatch(getPostsFail());
      });
  }
}

function postsAvailable(posts) {
  return {
    type: POSTS_AVAILABLE,
    posts
  }
}
