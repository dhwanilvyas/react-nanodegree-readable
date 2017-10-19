import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { votePost } from '../../redux/actions/posts';

const UpVote = ({post, dispatch}) => (
  <Button
    icon='thumbs up'
    size='mini'
    color='green'
    title='Up vote this post'
    onClick={() => dispatch(votePost('upVote', post))}
  />
);

export default connect()(UpVote);
