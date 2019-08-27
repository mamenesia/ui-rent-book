import Axios from 'axios';

export const getBooks = () => {
  return {
    type: 'GET_BOOKS',
    payload: Axios.get('http://localhost:8080/books')
  };
};

export const addBook = () => {
  return {
    type: 'POST_BOOK',
    payload: Axios.post('')
  };
};
