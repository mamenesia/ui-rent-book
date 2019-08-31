import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import AddBookModal from './AddBookModal';
import AuthService from './AuthService';
import AdminImg from '../Admin.png';
import UserImg from '../User2.jpg';
import decode from 'jwt-decode';

const Auth = new AuthService();

export default class Sidebar extends Component {
  render() {
    const token = localStorage.getItem('token');
    let decoded;
    if (token) {
      decoded = decode(token);
    }
    return (
      <Fragment>
        <nav id='sidebar'>
          <div className='sidebar-header text-center '>
            <h3>Library App</h3>
          </div>

          <ul className='list-unstyled components'>
            <img
              src={`${!Auth.loggedIn() ? AdminImg : UserImg}`}
              className='d-flex justify-center'
              alt='avatar img'
              style={{
                margin: 'auto',
                verticalAlign: 'middle',
                horizontalAlign: 'middle',
                width: '150px',
                height: '150px',
                borderRadius: '50%'
              }}
            />
            <p className='text-dark text-center font-weight-bold'>
              {`${
                !Auth.loggedIn()
                  ? "Free User's Avatar"
                  : `Hello, ${decoded.username}`
              }`}
            </p>
            <li>
              <Link to='/explore' underline='none'>
                <a href='!#' className='nav-link font-weight-bold'>
                  Explore
                </a>
              </Link>
            </li>
            <li className={`${!Auth.loggedIn() ? 'd-none' : ''}`}>
              <Link to='/history' underline='none'>
                <a href='!#' className='nav-link font-weight-bold'>
                  History
                </a>
              </Link>
            </li>
            <li className={`${!Auth.loggedIn() ? 'd-none' : ''}`}>
              <Link>
                <a
                  href='!#'
                  className='nav-link font-weight-bold'
                  data-toggle='modal'
                  data-target='#AddBookModal'
                >
                  Add Book
                </a>
              </Link>
            </li>
          </ul>
        </nav>
        <AddBookModal />
      </Fragment>
    );
  }
}
