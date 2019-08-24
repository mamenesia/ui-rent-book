import React, { Component, Fragment } from 'react';

export default class statusModal extends Component {
  render() {
    return (
      <Fragment>
        <div id='DeleteModal' className='modal' tabindex='-1' role='dialog'>
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
