import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Confirm } from 'semantic-ui-react';
import { deletePost } from '../../redux/actions/posts';

class DeleteButton extends Component {
  state = {
    modalOpen: false
  };

  handleConfirmModal() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  }

  confirmDelete() {
    this.props.deletePost(this.props.post);
    this.handleConfirmModal();
    this.props.history.push('/');
  }

  render() {
    return (
      <span>
        <Confirm
          open={this.state.modalOpen}
          onCancel={() => this.handleConfirmModal()}
          onConfirm={() => this.confirmDelete()}
          header='Confirm action'
          content='Are you sure you want to delete this post?'
        />
        <Button
          icon='delete'
          size='mini'
          color='red'
          title='Delete this post'
          onClick={() => this.handleConfirmModal()}
        />
      </span>
    );
  }
}

export default withRouter(connect(null, {deletePost})(DeleteButton));
