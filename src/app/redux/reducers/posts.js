import {
  POSTS_AVAILABLE
} from '../actions/types';

const initialState = {
  posts: [],
  postsLoading: true
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_AVAILABLE:
      const { posts } = action;
      return Object.assign({}, state, {
        posts: posts.filter(post => !post.deleted),
        postsLoading: false
      });
    default:
      return initialState;
  }
}

export default postsReducer;
