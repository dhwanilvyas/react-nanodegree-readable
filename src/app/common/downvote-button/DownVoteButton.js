import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { votePost } from '../../redux/actions/posts';

const DownVote = ({post, dispatch}) => (
  <Button
    icon='thumbs down'
    size='mini'
    title='Down vote this post'
    onClick={() => dispatch(votePost('downVote', post))}
  />
);

export default connect()(DownVote);
