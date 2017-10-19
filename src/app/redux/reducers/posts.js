import sortBy from 'sort-by';
import {
  POSTS_AVAILABLE,
  VOTED_POST,
  READ_POST,
  DELETED_POST,
  SORT_POSTS,
  ADD_POST,
  UPDATE_POST
} from '../actions/types';

const initialState = {
  posts: [],
  postReading: null
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POSTS_AVAILABLE:
      const { posts } = action;
      return Object.assign({}, state, {
        posts: posts.filter(post => !post.deleted),
      });
    case VOTED_POST:
      const { updatedPost } = action;
      return Object.assign({}, state, {
        posts: state.posts.map(post => {
          if (updatedPost.id === post.id) {
            post.voteScore = updatedPost.voteScore;
            return post;
          }
          return post;
        }),
        postReading: updatedPost
      });
    case READ_POST:
      const { post } = action;
      return Object.assign({}, state, {
        postReading: post
      });
    case DELETED_POST:
      const deletedPost = action.post;
      return Object.assign({}, state, {
        posts: state.posts.filter(post => deletedPost.id !== post.id),
      });
    case SORT_POSTS:
      const { field } = action;
      let statePosts = state.posts.slice();
      return Object.assign({}, state, {
        posts: statePosts.sort(sortBy('-' + field))
      });
    case ADD_POST:
      return Object.assign({}, state, {
        posts: [...state.posts, action.post]
      });
    case UPDATE_POST:
      return Object.assign({}, state, {
        posts: state.posts.map(post => {
          if (post.id === action.post.id) {
            post = action.post;
            return post;
          }
          return post;
        })
      });
    default:
      return state;
  }
}

export default postsReducer;
