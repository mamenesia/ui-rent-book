import Axios from 'axios';

export const getHistory = () => {
  return {
    type: 'GET_HISTORY',
    // payload: Axios.get('http://localhost:8080/books/history' || 'http://remotemysql.com:3306/books/history')
    payload: Axios.get('http://remotemysql.com:3306/books/history')
  }
}