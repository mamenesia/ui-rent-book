import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';

export default class Search extends Component {
  state = {
    books: []
  };
  componentDidMount = () => {
    Axios.get(
      `${process.env.REACT_APP_PORT}/books?search=${this.props.match.params.search}`,
      {
        headers: {
          Authorization: process.env.REACT_APP_KEY
        }
      }
    )
      .then(res => {
        this.setState({ books: res.data.result });
        console.log(this.state);
        console.log(res);
      })
      .catch(err => console.log(err));
  };
  render() {
    const { books } = this.state;
    return (
      <Fragment>
        <Sidebar />

        <div className='wrapper'>
          <div id='content'>
            <Navbar />
            <Typography variant='h4' className='my-4'>
              {this.props.match.params.genre}
            </Typography>
            <Grid
              container
              spacing={5}
              direction='row'
              justify='center'
              alignItems='flex-end'
            >
              {books.length > 0 ? (
                books.map((item, index) => {
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
          </div>
        </div>
      </Fragment>
    );
  }
}
