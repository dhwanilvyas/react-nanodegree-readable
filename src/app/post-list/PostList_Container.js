import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostListContainer extends Component {
  render() {
    console.log(this.props.posts);

    return (
      <h1>Posts</h1>
    );
  }
}

const mapStateToProps = ({posts}) => {
  return {
    posts
  };
}

export default connect(mapStateToProps)(PostListContainer);
