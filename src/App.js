import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './app/home/Home';
import PostDetail from './app/post-detail/PostDetail';
import PostListContainer from './app/post-list/PostList_Container';
import PostAddUpdate from './app/post-add-update/PostAddUpdate';
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
              <Route path='/' exact component={Home} />
              <Route path='/publish' exact component={PostAddUpdate} />
              <Route path='/:category' exact component={PostListContainer} />
              <Route path='/:category/:post' exact component={PostDetail} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
