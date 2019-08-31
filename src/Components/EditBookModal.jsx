import React, { Component, Fragment } from 'react';
// import Axios from 'axios';
import { connect } from 'react-redux';
import { getGenres } from '../Public/Actions/genres';
import { updateBook } from '../Public/Actions/books';
import Swal from 'sweetalert2';

class EditBookModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book_id: props.data.books.book_id,
      title: props.data.books.title,
      image: props.data.books.image_url,
      genre: props.data.books.genre,
      desc: props.data.books.desc,
      genres: []
    };
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleChangeGenre = this.handleChangeGenre.bind(this);
    this.handleChangeDesc = this.handleChangeDesc.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCancel = () => {
    Swal.fire({
      title: 'Cancelled',
      text: 'Your process is cancelled',
      type: 'error',
      showConfirmButton: false,
      timer: 2000
    });
  };

  handleChangeTitle = e => {
    this.setState({ title: e.target.value });
    console.log(this.state.title);
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

  componentDidMount = async () => {
    await this.props.dispatch(getGenres());
    this.setState({ genres: this.props.genres });
    console.log(this.props);
    // Axios.get(`${process.env.REACT_APP_PORT}/books/genre`, {
    //   headers: {
    //     Authorization: process.env.REACT_APP_KEY
    //   }
    // })
    //   .then(res => {
    //     this.setState({ books: res.data.result });
    //     console.log(this.state);
    //     console.log(this.props.props.match.params.id);
    //   })
    //   .catch(err => console.log(err));
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { title, image, genre, desc } = this.state;
    const book_id = this.props.props.match.params.id;

    Swal.fire({
      title: 'Are you sure?',
      text: 'Please make sure the data is valid!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update the book!',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await this.props.dispatch(
            updateBook(book_id, title, image, genre, desc)
          );
        } catch {
          Swal.fire('Failed!', 'The book is failed to update', 'error');
        }
      }
    }).then(result => {
      if (result.value) {
        Swal.fire({
          title: 'Updated!',
          text: 'The book has been updated.',
          type: 'success',
          timer: 2000,
          showConfirmButton: false
        });
        setInterval(() => window.location.reload(), 2200);
      }
      // } else if (result.dismiss === Swal.DismissReason.cancel) {
      //   Swal.fire('Cancelled', 'Your process is cancelled', 'error');
      // }
    });
    // this.setState({title: })

    // Axios.patch(
    //   `${process.env.REACT_APP_PORT}/books/${this.props.props.match.params.id}`,
    //   {
    //     title: this.state.title,
    //     image: this.state.image,
    //     genre: this.state.genre,
    //     desc: this.state.desc
    //   }
    // )
    //   .then(res => {
    //     window.location.reload(true);
    //   })
    //   .catch(err => console.log(err));
  };
  render() {
    const { genres } = this.state;
    return (
      <Fragment>
        <div id='EditBookModal' className='modal' tabIndex='-1' role='dialog'>
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
                      required
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
                      required
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
                      defaultValue={this.props.data.books.genre}
                      onChange={this.handleChangeGenre}
                      required
                    >
                      <option>{this.props.data.books.genre}</option>
                      {genres.genreList
                        ? genres.genreList.map((item, index) => {
                            return (
                              <option key={index} value={item.genre_id}>
                                {item.genre}
                              </option>
                            );
                          })
                        : 'Loading Genres...'}
                    </select>
                  </div>
                  <div className='form-group row d-flex justify-content-around'>
                    <label
                      htmlFor='desc'
                      className='col-sm-2 col-form-label font-weight-bold'
                    >
                      Description
                    </label>
                    <input
                      className='form-control col-sm-8'
                      id='desc'
                      name='desc'
                      rows='3'
                      defaultValue={this.props.data.books.desc}
                      onChange={this.handleChangeDesc}
                      required
                    />
                  </div>
                  <div className='modal-footer'>
                    <button
                      className='btn btn-warning text-white'
                      type='submit'
                      onSubmit={this.handleSubmit}
                    >
                      Update Book
                    </button>
                    <button
                      className='btn btn-secondary'
                      data-dismiss='modal'
                      onClick={this.handleCancel}
                    >
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

const mapStateToProps = state => {
  return { genres: state.genres };
};

export default connect(mapStateToProps)(EditBookModal);
