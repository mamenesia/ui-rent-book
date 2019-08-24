import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default class Categories extends Component {
  state = {
    genre: []
  };

  componentDidMount = () => {
    Axios.get('http://localhost:8080/books/genre', {
      headers: {
        Authorization: process.env.REACT_APP_KEY
      }
    })
      .then(res => {
        this.setState({ genre: res.data.result });
        console.log(this.state);
        console.log(this.props);
      })
      .catch(err => console.log(err));
  };
  render() {
    const { genre } = this.state;
    return (
      <div>
        <div className='dropdown mx-4'>
          <button
            className='btn btn-white dropdown-toggle'
            type='button'
            id='dropdownMenu2'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
          >
            All Categories
          </button>
          <div className='dropdown-menu' aria-labelledby='dropdownMenu2'>
            {genre.map((item, index) => {
              return (
                <Link to={`/genre/${item.genre}`}>
                  <button key={index} className='dropdown-item' type='button'>
                    {item.genre}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
