import Axios from "axios";

export const getGenres = () => {
  return {
    type: 'GET_GENRES',
    payload: Axios.get('http://localhost:8080/books/genre')
    // payload: Axios.get('https://remotemysql.com:3306/books/genre')
  }
}