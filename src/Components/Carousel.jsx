import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Axios from 'axios';
import 'react-id-swiper/lib/styles/scss/swiper.scss';
import 'react-id-swiper/lib/styles/css/swiper.css';
import Swiper from 'react-id-swiper';
import { connect } from 'react-redux';
import { getAvailableBooks } from '../Public/Actions/books';

const params = {
  slidesPerView: 3,
  slidesPerGroup: 1,
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  spaceBetween: 30,
  loop: false,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  autoplay: {
    delay: 1500,
    disableOnInteraction: true
  },
  coverflowEffect: {
    rotate: 20,
    stretch: 0,
    depth: 150,
    modifier: 1,
    slideShadows: false
  },
  observer: true
};

class Carousel extends Component {
  state = {
    books: []
  };

  componentDidMount = async () => {
    await this.props.dispatch(getAvailableBooks());
    this.setState({
      books: this.props.books.bookList.filter(
        // eslint-disable-next-line eqeqeq
        book => book.status == 'Available'
      )
    });
    console.log(this.props);
    console.log(this.state);
    // Axios.get('http://localhost:8080/books/rent', {
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
    const { books } = this.state;
    return (
      <Swiper {...params}>
        {books ? (
          books.map((item, index) => {
            return (
              <div
                key={index}
                style={{ textAlign: 'center', margin: '10px 0' }}
              >
                <div style={{ display: 'inline-block', maxWidth: 500 }}>
                  <Link to={`/show/${item.book_id}`} underline='none'>
                    <img src={item.image_url} alt={item.title} />
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ fontSize: 30, marginTop: '50vh' }}>
            Loading Carousel ...
          </p>
        )}
      </Swiper>
    );
  }
}

const mapStateToProps = state => {
  return { books: state.books };
};

export default connect(mapStateToProps)(Carousel);
