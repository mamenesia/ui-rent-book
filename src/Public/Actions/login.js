import Axios from 'axios';

export const login = (username, password) => {
  return {
    type: 'LOGIN',
    payload: Axios.post('http://localhost:8080/login', {
      username: this.username,
      password: this.password
    })
  }
}