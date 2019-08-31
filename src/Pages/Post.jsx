import React, { Component, Fragment } from 'react';
// import { Link } from 'react-router-dom';
// import Axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Chip from '@material-ui/core/Chip';
import decode from 'jwt-decode';

import EditBookModal from '../Components/EditBookModal';
import './style.css';
import Swal from 'sweetalert2';

import AuthService from '../Components/AuthService';
import { connect } from 'react-redux';
import {
  deleteBook,
  getBook,
  rentBook,
  returnBook
} from '../Public/Actions/books';
import { getHistory } from '../Public/Actions/history';

const Auth = new AuthService();

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      history: []
    };
  }
  componentDidMount = async () => {
    const book_id = this.props.match.params.id;
    const token = localStorage.getItem('token');

    await this.props.dispatch(getBook(book_id));
    await this.props.dispatch(getHistory());
    this.setState({
      books: this.props.books.bookList.filter(
        // eslint-disable-next-line eqeqeq
        book => book.book_id == book_id
      )[0]
    });
    if (token) {
      const decoded = decode(token);
      this.setState({
        history: this.props.history.historyData.filter(history => {
          return (
            // eslint-disable-next-line eqeqeq
            history.book_id == book_id &&
            // eslint-disable-next-line eqeqeq
            history.user_id == decoded.id &&
            // eslint-disable-next-line eqeqeq
            history.return_at == 'false'
          );
        })
      });
    }

    console.log(this.props.books.bookList);
    console.log(this.state);

    // Axios.get(
    //   `http://localhost:8080/books/show/${this.props.match.params.id}`,
    //   {
    //     headers: {
    //       Authorization: process.env.REACT_APP_KEY
    //     }
    //   }
    // )
    //   .then(res => {
    //     this.setState({ books: res.data.result[0] });
    //     console.log(res);
    //     console.log(this.state);
    //     console.log(this.props.match);
    //   })
    //   .catch(err => console.log(err));
  };

  handleRentButton = async e => {
    const book_id = this.props.match.params.id;
    const token = localStorage.getItem('token');
    const decoded = decode(token);
    const user_id = decoded.id;
    Swal.fire({
      title: 'Are you sure to borrow the book?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, rent it!',
      preConfirm: async () => {
        try {
          await this.props.dispatch(rentBook(book_id, user_id));
        } catch {
          Swal.fire('Failed!', 'The book is failed to borrow', 'error');
        }
      }
    }).then(result => {
      if (result.value) {
        Swal.fire({
          title: 'Success!',
          text: 'The book has been borrowed.',
          type: 'success',
          timer: 2000,
          showConfirmButton: false
        });
        setInterval(() => window.location.reload(), 2200);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Your process is cancelled',
          type: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
    // Axios.patch(
    //   `http://localhost:8080/books/rent/${this.props.match.params.id}`
    // )
    //   .then(res => {
    //     if (res.status === 200) {
    //       window.location.reload();
    //     } else {
    //       alert(
    //         'Something went wrong, Please try again later or contact administrator'
    //       );
    //     }
    //     console.log(res);
    //   })
    //   .catch(err => console.log(err));
  };

  handleReturnButton = async e => {
    const book_id = this.props.match.params.id;
    const token = localStorage.getItem('token');
    const decoded = decode(token);
    const user_id = decoded.id;
    // window.location.reload();
    Swal.fire({
      title: 'Are you sure to return the book?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, return it!',
      preConfirm: async () => {
        try {
          await this.props.dispatch(returnBook(book_id, user_id));
        } catch {
          Swal.fire('Failed!', 'The book is failed to return', 'error');
        }
      }
    }).then(result => {
      if (result.value) {
        Swal.fire({
          title: 'Success!',
          text: 'The book has been returned.',
          type: 'success',
          timer: 2000,
          showConfirmButton: false
        });
        setInterval(() => window.location.reload(), 2200);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Your process is cancelled',
          type: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
    // Axios.patch(
    //   `http://localhost:8080/books/return/${this.props.match.params.id}`
    // )
    //   .then(res => {
    //     if (res.status === 200) {
    //       window.location.reload();
    //     } else {
    //       alert(
    //         'Something went wrong, Please try again later or contact administrator'
    //       );
    //     }
    //     console.log(res);
    //   })
    //   .catch(err => console.log(err));
  };

  handleBackButton = e => {
    window.location = '/';
  };

  handleDeleteButton = e => {
    const book_id = this.props.match.params.id;
    Swal.fire({
      title: 'Are you sure to delete?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      preConfirm: async () => {
        try {
          await this.props.dispatch(deleteBook(book_id));
        } catch {
          Swal.fire('Failed!', 'The book is failed to delete', 'error');
        }
      }
    }).then(result => {
      if (result.value) {
        Swal.fire({
          title: 'Deleted!',
          text: 'The book has been deleted.',
          type: 'success',
          timer: 2000,
          showConfirmButton: false
        });
        setInterval(() => (window.location = '/'), 2200);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Your process is cancelled',
          type: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });

    // window.location = '/';
    // Axios.delete(`http://localhost:8080/books/${this.props.match.params.id}`)
    //   .then(res => (window.location = '/'))
    //   .catch(err => console.log(err));
  };
  render() {
    const { books } = this.state;
    return (
      <Fragment>
        <CssBaseline />
        <Container maxWidth='lg'>
          <Toolbar className='toolbar'>
            <Grid
              container
              direction='row'
              justify='flex-start'
              alignItems='baseline'
            >
              <Grid item sm={9}>
                <IconButton onClick={this.handleBackButton} color='secondary'>
                  <ArrowBackIcon />
                </IconButton>
              </Grid>
              <div className={`${!Auth.loggedIn() ? 'd-none' : ''}`}>
                <Grid item sm={1}>
                  <Button
                    color='secondary'
                    size='medium'
                    className='button nav-link font-weight-bold'
                    data-toggle='modal'
                    data-target='#EditBookModal'
                  >
                    Edit
                  </Button>
                </Grid>
              </div>
              <div className={`${!Auth.loggedIn() ? 'd-none' : ''}`}>
                <Grid item sm={1}>
                  <Button
                    color='secondary'
                    className='button font-weight-bold'
                    size='medium'
                    data-toggle='modal'
                    data-target='#DeleteModal'
                    onClick={this.handleDeleteButton}
                  >
                    Delete
                  </Button>
                </Grid>
              </div>
            </Grid>
          </Toolbar>
          <main>
            {/* Main featured post */}
            <Paper
              className='mainFeaturedPost'
              style={{
                backgroundImage:
                  // eslint-disable-next-line eqeqeq
                  books.image_url == undefined
                    ? 'url(https://howfix.net/wp-content/uploads/2018/02/sIaRmaFSMfrw8QJIBAa8mA-article.png)'
                    : `url(${books.image_url})`
              }}
            >
              {/* Increase the priority of the hero background image */}
              {
                <img
                  style={{ display: 'none' }}
                  src={books.image_url}
                  alt='background'
                />
              }
              <div className='overlay' />
              <Grid container>
                <Grid item>
                  <div className='mainFeaturedPostContent' />
                </Grid>
              </Grid>
            </Paper>
            {/* End main featured post */}
            {/* Sub featured posts */}
            <Grid
              container
              spacing={4}
              className='cardGrid'
              justify='flex-end'
              xs={12}
            >
              {/* {featuredPosts.map(post => ( */}
              <Grid item xs={2}>
                <CardActionArea component='a' href='#'>
                  <Card className='card'>
                    <Hidden smDown>
                      <CardMedia
                        className='cardMedia'
                        image={books.image_url ? books.image_url : ''}
                        title='Image title'
                      />
                    </Hidden>
                  </Card>
                </CardActionArea>
              </Grid>
              {/* ))} */}
            </Grid>
            {/* End sub featured posts */}
            <Grid container spacing={5} className='mainGrid'>
              {/* Main content */}
              <Grid item xs={12} md={8}>
                <Chip
                  label={books.genre}
                  component='a'
                  href='/genre'
                  clickable
                  color='primary'
                />
                <Grid
                  container
                  direction='row'
                  justify='flex-start'
                  alignItems='center'
                  item
                  xs={12}
                >
                  <Grid item sm={8} spacing={4}>
                    <Typography variant='h4'>{books.title}</Typography>
                  </Grid>
                  <Grid item sm={4} align='right'>
                    <Typography
                      variant='h6'
                      color={
                        books.status === 'Available' ? 'primary' : 'secondary'
                      }
                    >
                      {books.status}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography
                  variant='subtitle1'
                  color='textSecondary'
                  gutterBottom
                >
                  {String(books.released_at).substr(0, 16)}
                </Typography>
                <Divider />
                <Typography align='justify' variant='body1'>
                  {books.desc}
                </Typography>
              </Grid>
              {/* End main content */}
              {/* Sidebar */}
              <Grid
                container
                direction='column'
                justify='center'
                alignItems='center'
                item
                xs={12}
                md={4}
              >
                <div className={`${!Auth.loggedIn() ? 'd-none' : ''}`}>
                  <Grid item>
                    <Button
                      variant='contained'
                      color={
                        books.status === 'Available' ? 'primary' : 'secondary'
                      }
                      // href='#contained-buttons'
                      className='button'
                      size='large'
                      fullWidth={true}
                      onClick={
                        books.status === 'Available'
                          ? this.handleRentButton
                          : this.handleReturnButton
                      }
                      value={books.status}
                    >
                      {books.status !== 'Available'
                        ? this.state.history.length > 0
                          ? 'Return'
                          : 'This book is still borrowed by someone else'
                        : 'Borrow'}
                    </Button>
                  </Grid>
                </div>
              </Grid>
              {/* End sidebar */}
            </Grid>
          </main>
        </Container>
        <EditBookModal data={this.state} props={this.props} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { books: state.books, history: state.history };
};

export default connect(mapStateToProps)(Blog);
