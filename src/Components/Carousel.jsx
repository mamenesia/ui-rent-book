import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import 'react-id-swiper/lib/styles/scss/swiper.scss';
import 'react-id-swiper/lib/styles/css/swiper.css';
import Swiper from 'react-id-swiper';

const params = {
  slidesPerView: 3,
  slidesPerGroup: 1,
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  spaceBetween: 30,
  loop: true,
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

  componentDidMount = () => {
    Axios.get('http://localhost:8080/books/rent', {
      headers: {
        Authorization: process.env.REACT_APP_KEY
      }
    })
      .then(res => {
        this.setState({ books: res.data.result });
        console.log(res);
      })
      .catch(err => console.log(err));
  };
  render() {
    const { books } = this.state;
    return (
      <Swiper {...params}>
        {books.map((item, index) => {
          return (
            <div key={index} style={{ textAlign: 'center', margin: '10px 0' }}>
              <div style={{ display: 'inline-block', maxWidth: 500 }}>
                <Link to={`/show/${item.book_id}`} underline='none'>
                  <img src={item.image_url} alt={item.title} />
                </Link>
              </div>
            </div>
          );
        })}
      </Swiper>
    );
  }
}
export default Carousel;
