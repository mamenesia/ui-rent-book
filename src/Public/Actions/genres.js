import Axios from "axios";

export const getGenres = () => {
  return {
    type: 'GET_GENRES',
    // payload: Axios.get('http://localhost:8080/books/genre' || 'http://remotemysql.com:3306/books/genre')
    payload: Axios.get('http://remotemysql.com:3306/books/genre')
  }
}