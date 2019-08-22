import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// import Post from './Pages/Post';
import Auth from './Pages/Auth';
import Home from './Pages/Home';
import Post from './Pages/Post';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Auth} />
        <Route path='/register' component={Auth} />
        <Route exact path='/show/:id' component={Post} />
      </Switch>
    </Router>
  );
}

export default App;
