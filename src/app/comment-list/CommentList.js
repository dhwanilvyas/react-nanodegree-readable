import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Segment, Button, Header, Comment, Form } from 'semantic-ui-react';
import { getComments, addComment, deleteComment, updateComment, voteComment } from '../redux/actions/comments';

class CommentList extends Component {
  state = {
    id: '',
    body: '',
    author: ''
  };

  componentDidMount() {
    this.props.dispatch(getComments(this.props.post));
  }

  editComment = (comment) => {
    this.setState({
      id: comment.id,
      body: comment.body,
      author: comment.author
    });
  }

  formatCommentDate = (comment) => {
    let commentDate = new Date(comment.timestamp);
    return moment([commentDate.getFullYear(), commentDate.getMonth(), commentDate.getDate()]).fromNow();
  }

  handleInputChange = (name, value) => {
    this.setState({[name]: value});
  }

  addUpdateComment = () => {
    if (this.state.id) {
      this.props.dispatch(updateComment(this.state));
    } else {
      let comment = {
        id: new Date().getTime(),
        timestamp: new Date().getTime(),
        parentId: this.props.post,
        author: this.state.author,
        body: this.state.body,
        deleted: false
      };

      this.props.dispatch(addComment(comment));
    }

    this.setState({
      id: '',
      body: '',
      author: ''
    });
  }

  deleteComment = (comment) => {
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
                  <Button floated='right' icon='edit' size='mini' color='grey' title='Edit this comment' onClick={() => this.editComment(comment)} />
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
        <Form reply onSubmit={() => this.addUpdateComment()}>
          <Form.TextArea name='body' placeholder='Body' value={this.state.body} onChange={(e, {name, value}) => this.handleInputChange(name, value)} />
          <Form.Input name='author' placeholder='Author' value={this.state.author} onChange={(e, {name, value}) => this.handleInputChange(name, value)} />
          {!this.state.id && <Button content='Add comment' primary />}
          {this.state.id && <Button content='Update comment' primary />}
        </Form>
      </Comment.Group>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments.comments
  };
};

export default connect(mapStateToProps)(CommentList);
