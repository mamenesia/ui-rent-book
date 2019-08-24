import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AuthService from './AuthService';
import Categories from './Categories';
import Logo from '../bookshelf.svg';

const Auth = new AuthService();
export default class Navbar extends Component {
  state = {
    search: '',
    redirect: false
  };

  handleLogout() {
    Auth.logout();
    window.location = '/';
  }

  handleChange = e => {
    this.setState({ search: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log();
    this.setState({ redirect: true });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to={`/search/${this.state.search}`} />;
    }
    return (
      <Fragment>
        <nav className='navbar navbar-expand-md navbar-light bg-light'>
          <div className='container-fluid'>
            <button
              type='button'
              id='sidebarCollapse'
              className='btn btn-white'
            >
              <i className='fas fa-bars' />
            </button>
            <button
              className='btn btn-light d-inline-block d-md-none ml-auto'
              type='button'
              data-toggle='collapse'
              data-target='#navbarSupportedContent'
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <i className='fas fa-ellipsis-v' />
            </button>

            <div
              className='collapse navbar-collapse'
              id='navbarSupportedContent'
            >
              <ul className='nav navbar-nav mx-auto'>
                <li className='nav-item'>
                  <Categories />
                </li>
                <li className='nav-item'>
                  <form className='form-inline' onSubmit={this.handleSubmit}>
                    <div className='input-group mx-auto'>
                      <div className='input-group-prepend'>
                        <button
                          className='btn btn-outline-success my-2 my-sm-0'
                          type='submit'
                        >
                          <i className='fas fa-search' />
                        </button>
                      </div>
                      <input
                        className='form-control mr-sm-2'
                        type='search'
                        placeholder='Search'
                        aria-label='Search'
                        name='search'
                        onChange={this.handleChange}
                      />
                    </div>
                  </form>
                </li>
                <li className={`nav-item ${Auth.loggedIn() ? 'd-none' : ''}`}>
                  <Link to='/login' underline='none'>
                    <a className='nav-link font-weight-bold' href='#'>
                      Login
                    </a>
                  </Link>
                </li>
                <li className={`nav-item ${Auth.loggedIn() ? 'd-none' : ''}`}>
                  <Link to='/register' underline='none'>
                    <a className='nav-link font-weight-bold' href='#'>
                      Register
                    </a>
                  </Link>
                </li>
                <li className={`nav-item ${Auth.loggedIn() ? '' : 'd-none'}`}>
                  <Link to='/login' underline='none'>
                    <a
                      className='nav-link'
                      href='#'
                      onClick={this.handleLogout.bind(this)}
                    >
                      Logout
                    </a>
                  </Link>
                </li>
                <li>
                  <a href={'/'}>
                    <div
                      className='d-flex align-self-end align-items-center '
                      style={{
                        verticalAlign: 'center',
                        textDecoration: 'none'
                      }}
                    >
                      <img
                        src={Logo}
                        alt='logo'
                        style={{ color: 'white', maxWidth: 40 }}
                      />
                      <p className='mb-0'>Library</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </Fragment>
    );
  }
}
