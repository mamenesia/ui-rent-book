import Axios from 'axios';

export const getHistory = () => {
  return {
    type: 'GET_HISTORY',
    // payload: Axios.get('http://localhost:8080/books/history' || 'https://remotemysql.com:3306/books/history')
    payload: Axios.get('https://remotemysql.com:3306/books/history')
  }
}