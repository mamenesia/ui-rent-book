import React, { Component, Fragment } from 'react';
import Axios from 'axios';

export default class AddBookModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      image: null,
      genre: null,
      desc: null,
      released_at: null,
      available: null,
      books: []
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleChangeGenre = this.handleChangeGenre.bind(this);
    this.handleChangeDesc = this.handleChangeDesc.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    Axios.post(`http://localhost:8080/books`, {
      title: this.state.title,
      image: this.state.image,
      genre: this.state.genre,
      desc: this.state.desc,
      released_at: this.state.released_at,
      available: this.state.available
    })
      .then(res => {
        console.log(this.state);
        console.log(this.props);
        window.location.reload(true);
      })
      .catch(err => console.log(err));
  };

  handleChangeTitle = e => {
    this.setState({ title: e.target.value });
  };
  handleChangeImage = e => {
    this.setState({ image: e.target.value });
  };
  handleChangeGenre = e => {
    this.setState({ genre: e.target.value });
  };
  handleChangeDesc = e => {
    this.setState({ desc: e.target.value });
  };
  handleChangeStatus = e => {
    this.setState({ available: e.target.value });
  };
  handleChangeDate = e => {
    this.setState({ released_at: e.target.value });
  };

  componentDidMount = () => {
    Axios.get('http://localhost:8080/books/genre', {
      headers: {
        Authorization: process.env.REACT_APP_KEY
      }
    })
      .then(res => {
        this.setState({ books: res.data.result });
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <Fragment>
        <div id='AddBookModal' className='modal' tabindex='-1' role='dialog'>
          <div className='modal-dialog modal-lg' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Add a New Book</h5>
                <button
                  className='close'
                  data-dismiss='modal'
                  aria-label='close'
                >
                  <span aria-hidden='true'>&times;</span>
                  <span className='sr-only'>Close</span>
                </button>
              </div>
              <div className='modal-body'>
                <form onSubmit={this.handleSubmit}>
                  <p>
                    Please fill out the book's information on the form below
                  </p>
                  <div className='form-group row d-flex justify-content-around'>
                    <label
                      htmlFor='title'
                      className='col-sm-2 col-form-label font-weight-bold'
                    >
                      Title
                    </label>
                    <input
                      type='text'
                      className='form-control col-sm-8'
                      name='title'
                      id='title'
                      placeholder='The Book Title'
                      onChange={this.handleChangeTitle}
                    />
                  </div>
                  <div className='form-group row d-flex justify-content-around'>
                    <label
                      htmlFor='image_url'
                      className='col-sm-2 col-form-label font-weight-bold'
                    >
                      Url Image
                    </label>

                    <input
                      type='text'
                      className='form-control col-sm-8'
                      id='image_url'
                      name='image_url'
                      placeholder='Book Cover Url'
                      onChange={this.handleChangeImage}
                    />
                  </div>
                  <div className='form-group row d-flex justify-content-around'>
                    <label
                      htmlFor='date'
                      class='col-sm-2 col-form-label font-weight-bold'
                    >
                      Release Date
                    </label>

                    <input
                      className='form-control col-sm-8'
                      type='date'
                      id='released_at'
                      name='released_at'
                      placeholder='Date Released'
                      onSubmit={this.handleChangeDate}
                    />
                  </div>
                  <div className='form-group row d-flex justify-content-around'>
                    <label
                      htmlFor='genre'
                      className='col-sm-2 col-form-label font-weight-bold'
                    >
                      Genre
                    </label>
                    <select
                      className='form-control col-sm-8'
                      id='genre'
                      name='genre'
                      onChange={this.handleChangeGenre}
                    >
                      {this.state.books.map((item, index) => {
                        return (
                          <option key={index} value={item.genre_id}>
                            {item.genre}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className='form-group row d-flex justify-content-around'>
                    <label
                      for='children'
                      className='col-sm-2 col-form-label font-weight-bold'
                    >
                      Status
                    </label>
                    <select
                      className='form-control col-sm-8'
                      id='available'
                      name='available'
                      onChange={this.handleChangeStatus}
                    >
                      <option value='1'>Available</option>
                      <option value='0'>Not Available</option>
                    </select>
                  </div>
                  <div className='form-group row d-flex justify-content-around'>
                    <label
                      htmlFor='desc'
                      className='col-sm-2 col-form-label font-weight-bold'
                    >
                      Description
                    </label>
                    <textarea
                      className='form-control col-sm-8'
                      id='desc'
                      name='desc'
                      rows='3'
                      onChange={this.handleChangeDesc}
                    />
                  </div>
                  <div className='modal-footer'>
                    <button
                      className='btn btn-warning text-white'
                      type='submit'
                      onSubmit={this.handleSubmit}
                    >
                      Add Book
                    </button>
                    <button className='btn btn-secondary' data-dismiss='modal'>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
