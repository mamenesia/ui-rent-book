import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// import Post from './Pages/Post';
import Auth from './Pages/Auth';
import Home from './Pages/Home';
import Post from './Pages/Post';
import Explore from './Pages/Explore';
import Category from './Pages/Category';
import Search from './Pages/Search';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Auth} />
        <Route path='/register' component={Auth} />
        <Route path='/explore' component={Explore} />
        <Route exact path='/show/:id' component={Post} />
        <Route exact path='/genre/:genre' component={Category} />
        <Route exact path='/search/:search' component={Search} />
      </Switch>
    </Router>
  );
}

export default App;
