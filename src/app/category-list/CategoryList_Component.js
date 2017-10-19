import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { capitalize } from '../../utils/helpers';
import { getCategories } from '../redux/actions/categories';

class CategoryList extends Component {

  componentDidMount() {
    this.props.dispatch(getCategories());
  }

  render() {
    const { categories } = this.props;

    if (!categories.length) {
      return <p>Categories loading...</p>;
    }

    return (
      <div>
        <List selection verticalAlign='middle'>
          {categories.map(category => {
            return (
              <List.Item key={category.name}>
                <List.Content>
                  <Link to={'/' + category.name}>
                    <List.Header>{capitalize(category.name)}</List.Header>
                  </Link>
                </List.Content>
              </List.Item>
            )
          })}
        </List>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories.categories,
  };
}

export default connect(mapStateToProps, null)(CategoryList);
