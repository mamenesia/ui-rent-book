import React, { Component, Fragment } from 'react';
import Axios from 'axios';
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

import './style.css';

export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }
  componentDidMount = () => {
    Axios.get(
      `http://localhost:8080/books/show/${this.props.match.params.id}`,
      {
        headers: {
          Authorization: process.env.REACT_APP_KEY
        }
      }
    )
      .then(res => {
        this.setState({ books: res.data.result[0] });
        console.log(res);
        console.log(this.props.match);
      })
      .catch(err => console.log(err));
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
                <IconButton>
                  <ArrowBackIcon />
                </IconButton>
              </Grid>
              <Grid item sm={1}>
                <Button
                  href='#text-buttons'
                  color='secondary'
                  className='button'
                >
                  Edit
                </Button>
              </Grid>
              <Grid item sm={1}>
                <Button
                  href='#text-buttons'
                  color='secondary'
                  className='button'
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
          <main>
            {/* Main featured post */}
            <Paper
              className='mainFeaturedPost'
              style={{
                backgroundImage: `url(${books.image_url})`
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
                        image={books.image_url}
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
                    <Typography variant='h6' color='secondary'>
                      {books.status}
                    </Typography>
                  </Grid>
                </Grid>
                <Typography
                  variant='subtitle1'
                  color='textSecondary'
                  gutterBottom
                >
                  {books.released_at}
                </Typography>
                <Divider />
                <Typography align='justify' variant='body1'>
                  Was there a beginning of time? Could time run backwards? Is
                  the universe infinite or does it have boundaries? These are
                  just some of the questions considered in the internationally
                  acclaimed masterpiece by the world renowned physicist -
                  generally considered to have been one of the world's greatest
                  thinkers. It begins by reviewing the great theories of the
                  cosmos from Newton to Einstein, before delving into the
                  secrets which still lie at the heart of space and time, from
                  the Big Bang to black holes, via spiral galaxies and strong
                  theory. To this day A Brief History of Time remains a staple
                  of the scientific canon, and its succinct and clear language
                  continues to introduce millions to the universe and its
                  wonders. This new edition includes recent updates from Stephen
                  Hawking with his latest thoughts about the No Boundary
                  Proposal and offers new information about dark energy, the
                  information paradox, eternal inflation, the microwave
                  background radiation observations, and the discovery of
                  gravitational waves. It was published in tandem with the app,
                  Stephen Hawking's Pocket Universe.
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
                <Grid item>
                  <Button
                    variant='contained'
                    color='secondary'
                    href='#contained-buttons'
                    className='button'
                    size='large'
                    fullWidth={true}
                  >
                    {books.status === 'Available' ? 'Borrow' : 'Return'}
                  </Button>
                </Grid>
              </Grid>
              {/* End sidebar */}
            </Grid>
          </main>
        </Container>
      </Fragment>
    );
  }
}
