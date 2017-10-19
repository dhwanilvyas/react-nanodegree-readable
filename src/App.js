import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PostListContainer from './app/post-list/PostList_Container';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <div className="App-nav">
              <Link to='/'>Readable</Link>
            </div>
            <div className="App-container">
              <Route path='/' exact component={PostListContainer} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
