import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Axios from 'axios';
import AuthService from './AuthService';
import { connect } from 'react-redux';
import { login } from '../Public/Actions/user';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Auth = new AuthService();
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { username, password } = this.state;
    await this.props.dispatch(login(username, password));
    // Axios.post('http://localhost:8080/login', {
    //   username: this.state.username,
    //   password: this.state.password
    // })
    //   .then(res => {
    //     console.log(res);
    //     console.log('status =', res.status);
    //   })
    //   .catch(err => console.log('error =', err));
    // this.Auth.login(this.state.username, this.state.password)
    //   .then(res => {
    //     console.log(res);
    //     if (res.status === 200) {
    //       window.location = '/';
    //     } else {
    //       alert(res.message);
    //       window.location.reload();
    //     }
    //   })
    //   .catch(err => {
    //     alert(err);
    //   });
  };
  handleChangeName = e => {
    this.setState({ username: e.target.value });
  };
  handleChangePass = e => {
    this.setState({ password: e.target.value });
  };
  render() {
    return (
      <div>
        <div className='FormTitle'>
          <h2 className='FormTitle__Header'>Login</h2>
          <p className='FormTitle__Text'>
            Welcome back, please login to your account
          </p>
        </div>
        <div className='FormCenter'>
          <form onSubmit={this.handleSubmit} className='FormFields'>
            <div className='FormField'>
              <label className='FormField__Label' htmlFor='username'>
                Username
              </label>
              <input
                type='text'
                id='username'
                className='FormField__Input'
                placeholder='Enter your username'
                name='username'
                onChange={this.handleChangeName}
              />
            </div>
            <div className='FormField'>
              <label className='FormField__Label' htmlFor='password'>
                Password
              </label>
              <input
                type='password'
                id='password'
                className='FormField__Input'
                placeholder='Enter your password'
                name='password'
                onChange={this.handleChangePass}
              />
            </div>

            <div className='FormField'>
              <button className='FormField__Button mr-20' type='submit'>
                LOGIN
              </button>
              <span className='mx-4' />
              <Link to='/register' className='FormField__Link'>
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: [state.username, state.password] };
};

export default connect(mapStateToProps)(Login);
