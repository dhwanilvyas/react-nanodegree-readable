import React, { Component } from 'react';
import { Container, List, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import UpVoteButton from '../common/upvote-button/UpVoteButton';
import DownVoteButton from '../common/downvote-button/DownVoteButton';
import EditButton from '../common/edit-button/EditButton';
import DeleteButton from '../common/delete-button/DeleteButton';
import Sort from '../common/sort/Sort';
import { getPosts } from '../redux/actions/posts';
import { capitalize } from '../../utils/helpers';

class PostListContainer extends Component {
  componentDidMount() {
    this.props.dispatch(getPosts(this.props.match.params.category));
  }

  getUrl(post) {
    let url = '/' + post.category + '/' + post.id;
    this.props.history.push(url);
  }

  render() {
    const { posts, match } = this.props;

    if (!posts.length) {
      return (
        <Container>
          <p>No posts found for category {match.params.category}.</p>
        </Container>
      );
    }

    return (
      <Container>
        <p>{match.params.category && 'Posts for category ' + match.params.category}</p>
        <Sort />
        <List selection verticalAlign='middle'>
          {posts.map(post => {
            return (
              <List.Item key={post.id}>
                <Segment>
                  <List.Content floated='right'>
                    <UpVoteButton post={post} />
                    <DownVoteButton post={post} />
                    <EditButton post={post} />
                    <DeleteButton post={post} />
                  </List.Content>
                  <List.Content onClick={() => this.getUrl(post)}>
                    <h4>{post.title}</h4>
                    <List.Description>
                      <span>By: {capitalize(post.author)} | </span>
                      <span>Votes: {post.voteScore} | </span>
                      <span>Comments: {post.commentCount}</span>
                    </List.Description>
                  </List.Content>
                </Segment>
              </List.Item>
            )
          })}
        </List>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts
  };
}

export default withRouter(connect(mapStateToProps)(PostListContainer));
