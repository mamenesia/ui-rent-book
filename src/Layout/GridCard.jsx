import React, { Component, Fragment } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Pagination from '../Components/Pagination';
import { connect } from 'react-redux';
import { getBooks } from '../Public/Actions/books';
import { getGenres } from '../Public/Actions/genres';

class GridCard extends Component {
  state = {
    getBooks: [],
    genres: [],
    currentPage: 1,
    numPerPage: 12
  };

  componentDidMount = async () => {
    await this.props.dispatch(getBooks());
    this.setState({ getBooks: this.props.books.bookList });
    await this.props.dispatch(getGenres());
    this.setState({ genres: this.props.genres.genreList });
    console.log(this.props);
    console.log(this.state);
  };
  handleOldest = async () => {
    await this.props.dispatch(
      getBooks(null, this.state.currentPage, 'released_at', 'ASC', null, null)
    );
    this.setState({ getBooks: this.props.books.bookList });
  };
  handleNewest = async () => {
    await this.props.dispatch(
      getBooks(null, this.state.currentPage, 'released_at', 'DESC', null, null)
    );
    this.setState({ getBooks: this.props.books.bookList });
  };

  handleTitleASC = async () => {
    await this.props.dispatch(
      getBooks(null, this.state.currentPage, 'title', 'ASC', null, null)
    );
    this.setState({ getBooks: this.props.books.bookList });
  };
  handleTitleDESC = async () => {
    await this.props.dispatch(
      getBooks(null, this.state.currentPage, 'title', 'DESC', null, null)
    );
    this.setState({ getBooks: this.props.books.bookList });
  };
  handleSearchChange = e => {
    this.setState({
      search: e.target.value
    });
  };

  handleSearchSubmit = async e => {
    e.preventDefault();
    await this.props.dispatch(
      getBooks(
        null,
        this.state.currentPage,
        'released_at',
        'DESC',
        this.state.search,
        null
      )
    );
    this.setState({
      getBooks: this.props.books.bookList.filter(book =>
        book.title.toLowerCase().includes(this.state.search)
      )
    });
  };

  render() {
    let { getBooks, genres, currentPage, numPerPage } = this.state;
    const indexOfLastBook = currentPage * numPerPage;
    const indexOfFirstBook = indexOfLastBook - numPerPage;
    // const currentBooks = getBooks.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = pageNumber => this.setState({ currentPage: pageNumber });
    const handleNext = increment => {
      if (currentPage !== Math.ceil(getBooks.length / numPerPage))
        this.setState({ currentPage: currentPage + increment });
    };
    const handlePrev = decrement => {
      if (currentPage !== 1)
        this.setState({ currentPage: currentPage - decrement });
    };
    const handleCategory = genre =>
      this.setState({
        // eslint-disable-next-line eqeqeq
        getBooks: this.props.books.bookList.filter(book => book.genre == genre)
      });
    const handleAvailable = () =>
      this.setState({
        getBooks: this.props.books.bookList.filter(
          // eslint-disable-next-line eqeqeq
          book => book.status == 'Available'
        )
      });

    const handleNotAvailable = () =>
      this.setState({
        getBooks: this.props.books.bookList.filter(
          // eslint-disable-next-line eqeqeq
          book => book.status == 'Not Available'
        )
      });

    return (
      <Fragment>
        <Typography variant='h4' className='my-4'>
          List Books
        </Typography>
        <div className='dropdown my-3 d-flex'>
          <div style={{ display: 'inline-block' }}>
            <button
              className='btn btn-success dropdown-toggle mr-3'
              type='button'
              id='dropdownGenre'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              All Categories
            </button>
            <div className='dropdown-menu' aria-labelledby='dropdownGenre'>
              {genres
                ? genres.map((item, index) => {
                    return (
                      <button
                        key={index}
                        className='dropdown-item'
                        type='button'
                        onClick={() => handleCategory(item.genre)}
                      >
                        {item.genre}
                      </button>
                    );
                  })
                : 'Loading...'}
            </div>
          </div>
          <div style={{ display: 'inline-block' }}>
            <button
              className='btn btn-info dropdown-toggle'
              type='button'
              id='dropdownSort'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              All Time
            </button>
            <div className='dropdown-menu' aria-labelledby='dropdownSort'>
              <button
                className='dropdown-item'
                type='button'
                onClick={() => this.handleNewest()}
              >
                Newest
              </button>
              <button
                className='dropdown-item'
                type='button'
                onClick={() => this.handleOldest()}
              >
                Oldest
              </button>
              <button
                className='dropdown-item'
                type='button'
                onClick={() => this.handleTitleASC()}
              >
                Title (A-Z)
              </button>
              <button
                className='dropdown-item'
                type='button'
                onClick={() => this.handleTitleDESC()}
              >
                Title (Z-A)
              </button>
              <button
                className='dropdown-item'
                type='button'
                onClick={() => handleAvailable()}
              >
                Available
              </button>
              <button
                className='dropdown-item'
                type='button'
                onClick={() => handleNotAvailable()}
              >
                Not Available
              </button>
            </div>
          </div>
          <div className='justify-content-center mx-auto'>
            <form className='form-inline' onSubmit={this.handleSearchSubmit}>
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
                  onChange={this.handleSearchChange}
                />
              </div>
            </form>
          </div>
          <div
            style={{
              display: 'inline-block',
              // marginRight: '0',
              marginLeft: 'auto'
            }}
          >
            {getBooks ? (
              <Pagination
                numPerPage={numPerPage}
                totalBooks={getBooks.length}
                paginate={paginate}
                handleNext={handleNext}
                handlePrev={handlePrev}
              />
            ) : (
              ''
            )}
          </div>
        </div>

        <Grid
          container
          spacing={5}
          direction='row'
          justify='center'
          alignItems='flex-end'
        >
          {getBooks ? (
            getBooks
              .slice(indexOfFirstBook, indexOfLastBook)
              .map((item, index) => {
                return (
                  <Grid key={index} item xs={10} sm={6} md={4}>
                    <Link to={`/show/${item.book_id}`} underline='none'>
                      <Card style={{ maxWidth: 'auto', borderRadius: 30 }}>
                        <CardActionArea>
                          <CardMedia
                            component='img'
                            alt={item.title}
                            height='200'
                            image={item.image_url}
                            title={item.title}
                          />
                          <CardContent>
                            <Chip
                              size='small'
                              label={item.status}
                              color={
                                // eslint-disable-next-line eqeqeq
                                item.status == 'Available'
                                  ? 'primary'
                                  : 'secondary'
                              }
                            />
                            <Chip
                              size='small'
                              variant='outlined'
                              label={item.genre}
                            />

                            <Typography
                              gutterBottom
                              variant='h6'
                              component='h2'
                            >
                              {item.title.length > 27
                                ? item.title.substr(0, 27) + '...'
                                : item.title}
                            </Typography>
                            <Typography
                              variant='body2'
                              color='textSecondary'
                              component='p'
                            >
                              {item.desc.substr(0, 100)}...
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Link>
                  </Grid>
                );
              })
          ) : (
            <p style={{ fontSize: 80, marginTop: '50vh' }}>Loading ...</p>
          )}
        </Grid>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { books: state.books, genres: state.genres };
};

export default connect(mapStateToProps)(GridCard);
