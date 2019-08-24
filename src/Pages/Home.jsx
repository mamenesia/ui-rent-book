import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Carousel from '../Components/Carousel';
import Footer from '../Components/Footer';
import GridCard from '../Layout/GridCard';
import Explore from './Explore';
import Category from './Category';
import Search from './Search';

import App from '../App';

export default class Home extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/explore' component={Explore} />
          <Route exact path='/genre/:genre' component={Category} />
          <Route exact path='/search/:search' component={Search} />
          <Route exact path='/show/:id' component={App} />
          <Route exact path='/login' component={App} />
          <Route exact path='/register' component={App} />
          <div className='wrapper'>
            <Sidebar />
            <div id='content'>
              <Navbar />
              {/* <Cards /> */}
              <div className='my-5'>
                <Carousel />
              </div>
              <GridCard />
              <Footer />
            </div>
          </div>
        </Switch>
      </Router>
    );
  }
}
