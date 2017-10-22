import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Divider, Form } from 'semantic-ui-react';
import { addPost, updatePost } from '../redux/actions/posts';
import { capitalize } from '../../utils/helpers';

class PostAddUpdate extends Component {
  state = {
    id: '',
    title: '',
    author: '',
    category: '',
    body: ''
  };

  componentDidMount() {
    const state = this.props.location.state;

    if (state) {
      this.setState({
        id: state.post.id,
        title: state.post.title,
        author: state.post.author,
        category: state.post.category,
        body: state.post.body
      });
    }
  }

  handleInputChange = (e, {name, value}) => {
    this.setState({
      [name]: value
    });
  }

  addUpdate = () => {
    if (this.state.id) {
      this.props.updatePost(this.state);
    } else {
      this.props.addPost(this.state)
    }

    this.props.history.push('/');
  }

  render() {
    const { categories } = this.props;
    const { id, title, author, category, body } = this.state;

    return(
      <Container>
        <Header>{id ? 'Update post' : 'Add post'}</Header>
        <Divider />
        <Form onSubmit={this.addUpdate} warning>
          <Form.Input required label='Title' name='title' value={title} onChange={this.handleInputChange} />
          <Form.Input required label='Author' name='author' value={author} onChange={this.handleInputChange} />
          <Form.Select required label='Category' name='category' value={category} onChange={this.handleInputChange} options={categories} />
          <Form.TextArea required label='Body' name='body' value={body} onChange={this.handleInputChange} />
          <Form.Button>Publish!</Form.Button>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories.map(category => {
      return {
        key: category.path,
        value: category.name,
        text: capitalize(category.name)
      };
    })
  };
}

export default connect(mapStateToProps, {addPost, updatePost})(PostAddUpdate);
