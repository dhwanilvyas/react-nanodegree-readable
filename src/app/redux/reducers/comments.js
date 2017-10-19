import {
  COMMENTS_AVAILABLE,
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT
} from '../actions/types';

const initialState = {
  comments: []
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENTS_AVAILABLE:
      const { comments } = action;
      return Object.assign({}, state, {
        comments: comments.filter(comment => !comment.deleted)
      });
    case ADD_COMMENT:
      return Object.assign({}, state, {
        comments: [...state.comments, action.comment]
      });
    case UPDATE_COMMENT:
      return Object.assign({}, state, {
        comments: state.comments.map(comment => {
          if (comment.id === action.comment.id) {
            comment = action.comment;
            return comment;
          }
          return comment;
        })
      });
    case DELETE_COMMENT:
      return Object.assign({}, state, {
        comments: state.comments.filter(comment => comment.id !== action.comment.id)
      });
    default:
      return state;
  }
}

export default commentsReducer;
