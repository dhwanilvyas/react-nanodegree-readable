import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Segment, Button, Header, Comment, Form } from 'semantic-ui-react';
import { getComments, addComment, deleteComment, voteComment } from '../redux/actions/comments';

class CommentList extends Component {
  state = {
    comment: '',
    author: ''
  };

  componentDidMount() {
    this.props.dispatch(getComments(this.props.post));
  }

  formatCommentDate(comment) {
    let commentDate = new Date(comment.timestamp);
    return moment([commentDate.getFullYear(), commentDate.getMonth(), commentDate.getDate()]).fromNow();
  }

  handleInputChange(name, value) {
    this.setState({[name]: value});
  }

  addComment() {
    let comment = {
      id: new Date().getTime(),
      timestamp: new Date().getTime(),
      parentId: this.props.post.id,
      author: this.state.author,
      body: this.state.comment,
      deleted: false
    };

    this.props.dispatch(addComment(comment));
  }

  deleteComment(comment) {
    this.props.dispatch(deleteComment(comment.id));
  }

  render() {
    const { comments } = this.props;

    return (
      <Comment.Group>
        <Header dividing>Comments</Header>
        {!comments.length && <p>No comments for this post.</p>}
        {comments.length > 0 && comments.map(comment => {
          return (
            <Segment key={comment.id}>
              <Comment>
                <Comment.Content>
                  <Comment.Author as='a'>{comment.author}</Comment.Author>
                  <Comment.Metadata>
                    <div>
                      {this.formatCommentDate(comment)}
                    </div>
                  </Comment.Metadata>
                  <Button floated='right' icon='edit' size='mini' color='grey' title='Edit this comment'/>
                  <Button floated='right' icon='delete' size='mini' color='red' title='Delete this comment' onClick={() => this.deleteComment(comment)} />
                  <Button floated='right' icon='thumbs down' size='mini' title='Down vote this comment' onClick={() => this.props.dispatch(voteComment('downVote', comment))} />
                  <Button floated='right' icon='thumbs up' size='mini' color='green' title='Up vote this comment' onClick={() => this.props.dispatch(voteComment('upVote', comment))} />
                  <Comment.Text>
                    <p>{comment.voteScore} votes</p>
                    <p>{comment.body}</p>
                  </Comment.Text>
                </Comment.Content>
              </Comment>
            </Segment>
          );
        })}
        <Form reply onSubmit={() => this.addComment()}>
          <Form.TextArea name='comment' placeholder='Body' value={this.state.comment} onChange={(e, {name, value}) => this.handleInputChange(name, value)} />
          <Form.Input name='author' placeholder='Author' value={this.state.author} onChange={(e, {name, value}) => this.handleInputChange(name, value)} />
          <Button content='Add comment' primary />
        </Form>
      </Comment.Group>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    comments: state.comments.comments
  };
};

export default connect(mapStateToProps)(CommentList);
