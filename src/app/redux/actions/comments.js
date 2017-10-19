import axios from 'axios';
import {
  COMMENTS_AVAILABLE,
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT
} from './types';

export function getComments(post) {
  return function (dispatch) {
    axios.get('/posts/' + post + '/comments')
      .then(response => {
        dispatch(commentsAvailable(response));
      });
  }
}

function commentsAvailable(comments) {
  return {
    type: COMMENTS_AVAILABLE,
    comments
  };
}

export function addComment(comment) {
  return function(dispatch) {
    axios.post('/comments', comment)
      .then(response => {
        dispatch(commentAdded(response))
      });
  }
}

function commentAdded(comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function deleteComment(comment) {
  return function(dispatch) {
    axios.delete('/comments/' + comment)
      .then(response => {
        dispatch(commentDeleted(response))
      });
  }
}

function commentDeleted(comment) {
  return {
    type: DELETE_COMMENT,
    comment
  }
}

export function voteComment(option, comment) {
  return function(dispatch) {
    axios.post('comments/' + comment.id, { option })
      .then(response => {
        dispatch(updateComment(response));
      });
  }
}

function updateComment(comment) {
  return {
    type: UPDATE_COMMENT,
    comment
  };
}
