import Axios from 'axios';

export const getHistory = () => {
  return {
    type: 'GET_HISTORY',
    payload: Axios.get('http://localhost:8080/books/history')
  }
}