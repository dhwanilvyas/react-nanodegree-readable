import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const EditButton = ({post, history}) => (
  <Button
    icon='edit'
    size='mini'
    color='grey'
    title='Edit this post'
    onClick={() => history.push('/publish', {post})} />
);

export default withRouter(EditButton);
