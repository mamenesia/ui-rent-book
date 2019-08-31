import React, { Component } from 'react';
import AuthService from './AuthService';

export default function withAuth(AuthComponent) {
  const Auth = new AuthService(`${process.env.REACT_APP_PORT}`);
  return class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        user: null
      };
    }
    componentWillMount() {
      if (!Auth.loggedIn()) {
        window.location = '/login';
        alert('To accest this page, you must login first!');
      } else {
        try {
          const profile = Auth.getProfile();
          this.setState({
            user: profile
          });
        } catch (err) {
          Auth.logout();
          window.location = '/login';
        }
      }
    }

    render() {
      if (this.state.user) {
        return (
          <AuthComponent history={this.props.history} user={this.state.user} />
        );
      } else {
        return null;
      }
    }
  };
}
