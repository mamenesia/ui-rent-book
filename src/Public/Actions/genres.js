import Axios from "axios";

export const getGenres = () => {
  return {
    type: 'GET_GENRES',
    payload: Axios.get(`${process.env.REACT_APP_PORT}/books/genre`)
    // payload: Axios.get('https://remotemysql.com:3306/books/genre')
  }
}