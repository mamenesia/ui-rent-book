import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Axios from 'axios';
import AuthService from './AuthService';
import { connect } from 'react-redux';
import { register } from '../Public/Actions/user';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: ''
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.Auth = new AuthService();
  }

  handleChangeName = e => {
    this.setState({ username: e.target.value });
  };
  handleChangeEmail = e => {
    this.setState({ email: e.target.value });
  };
  handleChangePass = e => {
    this.setState({ password: e.target.value });
  };
  handleSubmit = async e => {
    e.preventDefault();
    let { username, email, password } = this.state;
    await this.props.dispatch(register(username, email, password));

    // Axios.post('${process.env.REACT_APP_PORT}/register', {
    //   username: this.state.username,
    //   email: this.state.email,
    //   password: this.state.password
    // })
    //   .then(res => {
    //     console.log(res.data);
    //     if (res.status === 200) {
    //       alert(res.data.message);
    //       window.location = '/login';
    //     }
    //   })
    //   .then(res => console.log(res))
    //   .catch(err => {
    //     alert('Please input valid data');
    //     console.log('error =', err);
    //   });
  };
  render() {
    return (
      <div>
        <div className='FormTitle'>
          <h2 className='FormTitle__Header'>Register</h2>
          <p className='FormTitle__Text'>
            Welcome back, please register to create account
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
              <label className='FormField__Label' htmlFor='email'>
                E-Mail Address
              </label>
              <input
                type='email'
                id='email'
                className='FormField__Input'
                placeholder='Enter your email'
                name='email'
                onChange={this.handleChangeEmail}
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
                REGISTER
              </button>
              <span className='mx-4' />
              <Link to='/login' className='FormField__Link'>
                I'm already a member
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: [state.username, state.email, state.password] };
};
export default connect(mapStateToProps)(Register);
