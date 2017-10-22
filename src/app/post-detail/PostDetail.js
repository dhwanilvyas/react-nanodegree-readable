import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, List } from 'semantic-ui-react';
import EditButton from '../common/edit-button/EditButton';
import UpVoteButton from '../common/upvote-button/UpVoteButton';
import DownVoteButton from '../common/downvote-button/DownVoteButton';
import DeleteButton from '../common/delete-button/DeleteButton';
import CommentList from '../comment-list/CommentList';
import { readPost } from '../redux/actions/posts';

class PostDetail extends Component {
  componentDidMount() {
    this.props.dispatch(readPost(this.props.match.params.post));
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return (
        <Container>
          <p>Loading...</p>
        </Container>
      );
    }

    if (!post.id) {
      return (
        <Container>
          <p>No post found.</p>
        </Container>
      );
    }

    return (
      <Container>
        <List>
          <List.Item>
            <List.Content floated='right'>
              <UpVoteButton post={post} />
              <DownVoteButton post={post} />
              <EditButton post={post} />
              <DeleteButton post={post} />
            </List.Content>
            <List.Content>
              <h1>{post.title}</h1>
            </List.Content>
          </List.Item>
        </List>
        <h4>Posted by {post.author} {post.time}</h4>
        <p>Votes: {post.voteScore} | Comments: {post.commentCount}</p>
        <p>{post.body}</p>
        <br />
        <CommentList post={post.id} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.posts.postReading
  };
};

export default connect(mapStateToProps)(PostDetail);
