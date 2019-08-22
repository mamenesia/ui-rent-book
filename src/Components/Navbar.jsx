import React, { Component, Fragment } from 'react';

export default class Navbar extends Component {
  render() {
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
                  <form className='form-inline'>
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
                      />
                    </div>
                  </form>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='google.com'>
                    Page
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='google.com'>
                    Page
                  </a>
                </li>
                <li className='nav-item dropdown'>
                  <a
                    className='nav-link dropdown-toggle'
                    href='google.com'
                    id='navbarDropdown'
                    role='button'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    Dropdown
                  </a>
                  <div
                    className='dropdown-menu'
                    aria-labelledby='navbarDropdown'
                  >
                    <a className='dropdown-item' href='google.com'>
                      Action
                    </a>
                    <a className='dropdown-item' href='google.com'>
                      Another action
                    </a>
                    <div className='dropdown-divider' />
                    <a className='dropdown-item' href='google.com'>
                      Something else here
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </Fragment>
    );
  }
}
