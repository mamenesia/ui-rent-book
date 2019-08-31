import Axios from 'axios';

export const getHistory = () => {
  return {
    type: 'GET_HISTORY',
    payload: Axios.get(`${process.env.REACT_APP_PORT}/books/history`)
    // payload: Axios.get('https://remotemysql.com:3306/books/history')
  }
}