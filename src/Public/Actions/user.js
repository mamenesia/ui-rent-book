import Axios from 'axios';
import Swal from 'sweetalert2';

export const login = (username, password) => {
  return {
    type: 'LOGIN_USER',
    payload: Axios.post('http://localhost:8080/login', {
      // payload: Axios.post('https://remotemysql.com:3306/login', {
      username,
      password
    }).then(res => {
      // eslint-disable-next-line eqeqeq
      if (res.data.status == 200) {
        const token = res.data.token;
        localStorage.setItem('token', token)
        Swal.fire({
          title: 'Success!',
          text: `${res.data.message}`,
          type: 'success',
          timer: 2000,
          showConfirmButton: false
        });
        setInterval(() => window.location = '/', 2200);
      } else {
        Swal.fire({
          title: 'Failed!',
          text: `${res.data.message}`,
          type: 'error',
          timer: 2000,
          showConfirmButton: false
        });
      }

    }).catch(err => {
      Swal.fire({
        title: 'Failed!',
        text: 'Username is does not exist',
        type: 'error',
        timer: 2000,
        showConfirmButton: false
      });
      // setInterval(() => window.location.reload(), 2200);
    })
  }
}

export const register = (username, email, password) => {
  return {
    type: 'REGISTER_USER',
    payload: Axios.post('http://localhost:8080/register', {
        // payload: Axios.post('https://remotemysql.com:3306/register', {
        username,
        email,
        password
      }).then(res => {
        if (res.data.status === 200) {
          console.log(res)
          Swal.fire({
            title: 'Success!',
            text: `${res.data.message}`,
            type: 'success',
            timer: 2000,
            showConfirmButton: false
          });
          setInterval(() => window.location = '/login', 2200);
        } else {
          Swal.fire({
            title: 'Failed!',
            text: `${res.data.message}`,
            type: 'error',
            timer: 2000,
            showConfirmButton: false
          });
          // setInterval(() => window.location.reload(), 2200);
        }
      })

      .catch(err => {
        console.log(err)
        Swal.fire({
          title: 'Failed!',
          text: 'Username or Email is already registered, please login!',
          type: 'error',
          timer: 2000,
          showConfirmButton: false
        });
        setInterval(() => window.location = '/login', 2200);
      })
  }
}