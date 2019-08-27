import React, { Component, Fragment } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { getBooks } from '../Public/Actions/books';

class GridCard extends Component {
  state = {
    getBooks: []
  };

  componentDidMount = async () => {
    await this.props.dispatch(getBooks());
    this.setState({ getBooks: this.props.books });
    console.log(this.props);
  };
  render() {
    const { getBooks } = this.state;
    return (
      <Fragment>
        <Typography variant='h4' className='my-4'>
          List Books
        </Typography>
        <Grid
          container
          spacing={5}
          direction='row'
          justify='center'
          alignItems='flex-end'
        >
          {getBooks.bookList ? (
            getBooks.bookList.map((item, index) => {
              return (
                <Grid key={index} item xs={10} sm={6} md={4}>
                  <Link to={`/show/${item.book_id}`} underline='none'>
                    <Card style={{ maxWidth: 'auto', borderRadius: 30 }}>
                      <CardActionArea>
                        <CardMedia
                          component='img'
                          alt='The Hunter Games'
                          height='200'
                          image={item.image_url}
                          title={item.title}
                        />
                        <CardContent>
                          <Typography gutterBottom variant='h5' component='h2'>
                            {item.title}
                          </Typography>
                          <Typography
                            variant='body2'
                            color='textSecondary'
                            component='p'
                          >
                            {item.desc.substr(0, 100)}
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
  return { books: state.books };
};

export default connect(mapStateToProps)(GridCard);
