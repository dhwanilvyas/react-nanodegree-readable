import React, { Component } from 'react';
import { Select } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { sortPosts } from '../../redux/actions/posts';

const options = [
  {
    key: 'date',
    value: 'timestamp',
    text: 'Date'
  },
  {
    key: 'score',
    value: 'voteScore',
    text: 'Score'
  }
];

class Sort extends Component {
  sort(field) {
    this.props.dispatch(sortPosts(field.value));
  }

  render() {
    return (
      <Select placeholder='Sort by' options={options} style={{marginRight: 5}} onChange={(a, b) => this.sort(b)} />
    );
  }
}

export default connect()(Sort);
