import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Segment, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CategoryList from '../category-list/CategoryList_Component';
import PostList from '../post-list/PostList_Container';

class Home extends Component {
  render() {
    return (
      <Container>
        <Grid columns='equal'>
          <Grid.Column>
            <h3>Categories</h3>
            <Segment>
              <CategoryList />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <List>
              <List.Item>
                <List.Content floated='right'>
                  <Link to='/publish'>
                    <strong>New Post</strong>
                  </Link>
                </List.Content>
                <List.Content>
                  <h3>Posts</h3>
                </List.Content>
              </List.Item>
            </List>
            <PostList />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default connect()(Home);
