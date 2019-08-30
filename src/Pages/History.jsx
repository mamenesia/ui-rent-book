import React, { Component, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
// import Axios from 'axios';
// import Card from '@material-ui/core/Card';
// import { Link } from 'react-router-dom';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { connect } from 'react-redux';
import { getHistory } from '../Public/Actions/history';
import decode from 'jwt-decode';

import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';

class History extends Component {
  state = {
    history: []
  };

  componentDidMount = async () => {
    const token = localStorage.getItem('token');
    const decoded = decode(token);
    await this.props.dispatch(getHistory());
    this.setState({
      history: this.props.history.historyData.filter(
        // eslint-disable-next-line eqeqeq
        history => history.user_id == decoded.id
      )
    });
    console.log(this.props);
    console.log(decoded);
    console.log(this.state);
    // Axios.get('http://localhost:8080/books?limit=100', {
    //   headers: {
    //     Authorization: process.env.REACT_APP_KEY
    //   }
    // })
    //   .then(res => {
    //     this.setState({ books: res.data.result });
    //     console.log(res);
    //   })
    //   .catch(err => console.log(err));
  };
  render() {
    const { history } = this.state;
    return (
      <Fragment>
        <Sidebar />

        <div className='wrapper'>
          <div id='content'>
            <Navbar />
            <Typography variant='h4' className='my-4'>
              History
            </Typography>
            <Grid
              container
              spacing={2}
              direction='row'
              justify='center'
              alignItems='flex-start'
            >
              <Paper style={{ width: '90%', overflow: 'auto' }}>
                <Table style={{ fontSize: 20 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell size='medium' align='center'></TableCell>
                      <TableCell size='medium' align='center'></TableCell>
                      <TableCell size='medium' align='center'>
                        ON BORROWING
                      </TableCell>
                      <TableCell size='medium' align='center'></TableCell>
                      <TableCell size='medium' align='center'></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align='center' width='15%'>
                        BOOK ID
                      </TableCell>
                      <TableCell align='center'>BOOK TITLE</TableCell>
                      <TableCell align='center'>RENT DATE</TableCell>
                      <TableCell align='center'>EXPIRED AT</TableCell>
                      <TableCell align='center'>RETURN DATE</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history
                      // eslint-disable-next-line eqeqeq
                      .filter(item => item.return_at == 'false')
                      .map((item, index) => (
                        <TableRow key={index}>
                          <TableCell align='center' component='th' scope='row'>
                            {item.book_id}
                          </TableCell>
                          <TableCell align='center'>
                            {item.title.substr(0, 40)}
                          </TableCell>
                          <TableCell align='center'>
                            {Date(item.rent_at).substr(0, 16)}
                          </TableCell>
                          <TableCell align='center'>
                            {item.expired_at.substr(0, 16)}
                          </TableCell>
                          <TableCell align='center'>
                            {/* eslint-disable-next-line eqeqeq */}
                            {item.return_at == 'false'
                              ? '-'
                              : Date(item.return_at).substr(0, 16)}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            <div className='my-5'></div>
            <Grid
              container
              spacing={2}
              direction='row'
              justify='center'
              alignItems='flex-start'
            >
              <Paper style={{ width: '90%', overflow: 'auto' }}>
                <Table style={{ fontSize: 20 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell size='medium' align='center'></TableCell>
                      <TableCell size='medium' align='center'></TableCell>
                      <TableCell size='medium' align='center'>
                        USER's HISTORY
                      </TableCell>
                      <TableCell size='medium' align='center'></TableCell>
                      <TableCell size='medium' align='center'></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align='center' width='15%'>
                        BOOK ID
                      </TableCell>
                      <TableCell width='30%' align='center'>
                        BOOK TITLE
                      </TableCell>
                      <TableCell align='center'>RENT DATE</TableCell>
                      <TableCell align='center'>EXPIRED AT</TableCell>
                      <TableCell align='center'>RETURN DATE</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell align='center' component='th' scope='row'>
                          {item.book_id}
                        </TableCell>
                        <TableCell align='center'>
                          {item.title.substr(0, 40)}
                        </TableCell>
                        <TableCell align='center'>
                          {Date(item.rent_at).substr(0, 16)}
                        </TableCell>
                        <TableCell align='center'>
                          {item.expired_at.substr(0, 16)}
                        </TableCell>
                        <TableCell align='center'>
                          {/* eslint-disable-next-line eqeqeq */}
                          {item.return_at == 'false'
                            ? '-'
                            : Date(item.return_at).substr(0, 16)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { history: state.history };
};

export default connect(mapStateToProps)(History);
