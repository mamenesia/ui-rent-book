import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

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
  }

  handleSubmit = e => {
    e.preventDefault();
    Axios.post('http://localhost:8080/login', {
      username: this.state.username,
      password: this.state.password
    })
      .then(res => {
        console.log('username =', this.state.username);
        window.location = '/';
      })
      .catch(err => console.log('error =', err));
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

export default Login;
