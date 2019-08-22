import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Navbar from '../Components/Navbar';
import Carousel from '../Components/Carousel';
import Footer from '../Components/Footer';
// import Cards from '../Components/Cards';
import GridCard from '../Layout/GridCard';
import App from '../App';
export default class Home extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/show/:id' component={App} />
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
