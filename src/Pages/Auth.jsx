import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import Register from '../Components/Register';
import Login from '../Components/Login';
import '../App.css';

class Auth extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <div className='App__Aside'>
            <h1 className='App__Quote'>Book is a window to the world</h1>
            <p className='App__Source'>Photo by Clay Banks on Unsplash</p>
          </div>
          <div className='App__Form'>
            <div className='PageSwitcher'>
              <NavLink
                to='/login'
                activeClassName='PageSwitcher__Item--Active'
                className='PageSwitcher__Item'
              >
                Login
              </NavLink>
              <NavLink
                to='/register'
                activeClassName='PageSwitcher__Item--Active'
                className='PageSwitcher__Item'
              >
                Register
              </NavLink>
            </div>

            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
          </div>
        </div>
      </Router>
    );
  }
}

export default Auth;
