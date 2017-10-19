import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    this.props.dispatch(deletePost(this.props.post));
    this.handleConfirmModal();
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

export default connect()(DeleteButton);
