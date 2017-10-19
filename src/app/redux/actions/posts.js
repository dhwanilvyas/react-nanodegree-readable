import axios from 'axios';
import {
  POSTS_AVAILABLE,
  VOTED_POST,
  READ_POST,
  DELETED_POST,
  SORT_POSTS,
  ADD_POST,
  UPDATE_POST
} from './types';

export function getPosts(category) {
  return function(dispatch) {
    let promise = axios.get('posts');
    if (category) promise = axios.get(category + '/posts');

    promise
      .then(response => {
        dispatch(postsAvailable(response));
      });
  }
}

function postsAvailable(posts) {
  return {
    type: POSTS_AVAILABLE,
    posts
  }
}

export function votePost(option, post) {
  return function(dispatch) {
    axios.post('posts/' + post.id, { option })
      .then(response => {
        dispatch(votedPost(response));
      });
  }
}

function votedPost(post) {
  return {
    type: VOTED_POST,
    updatedPost: post
  };
}

export function readPost(post) {
  return function(dispatch) {
    axios.get('/posts/' + post)
      .then(response => {
        dispatch(readPostAvailabe(response));
      });
  }
}

export function readPostAvailabe(post) {
  return {
    type: READ_POST,
    post
  };
}

export function deletePost(post) {
  return function(dispatch) {
    axios.delete('posts/' + post.id)
      .then(response => {
        dispatch(deletedPost(post));
      });
  }
}

function deletedPost(post) {
  return {
    type: DELETED_POST,
    post
  };
}

export function sortPosts(field) {
  return {
    type: SORT_POSTS,
    field
  };
}

export function addPost(post) {
  return function (dispatch) {
    post.id = new Date().getTime();

    axios.post('posts', post)
      .then(response => {
        dispatch(addedPost(response));
      });
  }
}

function addedPost(post) {
  return {
    type: ADD_POST,
    post
  };
}

export function updatePost(post) {
  return function (dispatch) {
    axios.put('posts/' + post.id, { title: post.title,body: post.body })
      .then(response => {
        dispatch(updatedPost(response));
      });
  }
}

function updatedPost(post) {
  return {
    type: UPDATE_POST,
    post
  };
}
