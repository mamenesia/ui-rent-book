import React, { Component } from 'react';
// import Axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getGenres } from '../Public/Actions/genres';

class Categories extends Component {
  state = {
    genre: []
  };

  componentDidMount = async () => {
    await this.props.dispatch(getGenres());
    this.setState({ genre: this.props.genres });
    console.log(this.props);
  };
  render() {
    const { genre } = this.state;
    return (
      <div>
        <div className='dropdown mx-4'>
          <button
            className='btn dropdown-toggle font-weight-bold btn-link'
            style={{ boreder: 'none' }}
            type='button'
            id='dropdownMenu2'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
          >
            All Categories
          </button>
          <div className='dropdown-menu' aria-labelledby='dropdownMenu2'>
            {genre.genreList
              ? genre.genreList.map((item, index) => {
                  return (
                    <Link to={`/genre/${item.genre}`} key={index}>
                      <button className='dropdown-item' type='button'>
                        {item.genre}
                      </button>
                    </Link>
                  );
                })
              : 'Loading Fetching Genres...'}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { genres: state.genres };
};

export default connect(mapStateToProps)(Categories);
