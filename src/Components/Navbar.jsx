import React, { Component, Fragment } from 'react';

export default class Navbar extends Component {
  render() {
    return (
      <Fragment>
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
          <div className='container-fluid'>
            <button type='button' id='sidebarCollapse' className='btn btn-info'>
              <i className='fas fa-align-justify' />
            </button>
            <button
              className='btn btn-dark d-inline-block d-lg-none ml-auto'
              type='button'
              data-toggle='collapse'
              data-target='#navbarSupportedContent'
              aria-controls='navbarSupportedContent'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <i className='fas fa-align-justify' />
            </button>

            <div
              className='collapse navbar-collapse'
              id='navbarSupportedContent'
            >
              <ul className='nav navbar-nav mx-auto'>
                <li className='nav-item'>
                  <form class='form-inline'>
                    <div className='input-group mx-auto'>
                      <div className='input-group-prepend'>
                        <button
                          class='btn btn-outline-success my-2 my-sm-0'
                          type='submit'
                        >
                          <i class='fas fa-search' />
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
                <li className='nav-item active'>
                  <a className='nav-link' href='#'>
                    Page
                  </a>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#'>
                    Page
                  </a>
                </li>
                <li className='nav-item dropdown'>
                  <a
                    className='nav-link dropdown-toggle'
                    href='#'
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
                    <a className='dropdown-item' href='#'>
                      Action
                    </a>
                    <a className='dropdown-item' href='#'>
                      Another action
                    </a>
                    <div className='dropdown-divider' />
                    <a className='dropdown-item' href='#'>
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
