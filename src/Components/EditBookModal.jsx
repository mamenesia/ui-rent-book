import React, { Component, Fragment } from 'react';
import Axios from 'axios';

export default class EditBookModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      image: null,
      genre: null,
      desc: null,
      books: []
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleChangeGenre = this.handleChangeGenre.bind(this);
    this.handleChangeDesc = this.handleChangeDesc.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    Axios.patch(
      `http://localhost:8080/books/${this.props.props.match.params.id}`,
      {
        title: this.state.title,
        image: this.state.image,
        genre: this.state.genre,
        desc: this.state.desc
      }
    )
      .then(res => {
        window.location.reload(true);
      })
      .catch(err => console.log(err));
  };

  handleChangeTitle = e => {
    console.log(this.props);
    console.log(this.state);
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

  componentDidMount = () => {
    Axios.get(`http://localhost:8080/books/genre`, {
      headers: {
        Authorization: process.env.REACT_APP_KEY
      }
    })
      .then(res => {
        this.setState({ books: res.data.result });
        console.log(this.state);
        console.log(this.props.props.match.params.id);
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <Fragment>
        <div id='EditBookModal' className='modal' tabindex='-1' role='dialog'>
          <div className='modal-dialog modal-lg' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>Edit Book</h5>
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
                      defaultValue={this.props.data.books.title}
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
                      defaultValue={this.props.data.books.image_url}
                      onChange={this.handleChangeImage}
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
                      <option>{this.props.data.books.genre}</option>
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
                      placeholder={this.props.data.books.desc}
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
