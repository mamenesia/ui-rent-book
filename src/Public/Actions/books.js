import Axios from 'axios';

export const getBooks = (
  limit = 12,
  page = 1,
  sort = 'released_at',
  order = 'DESC',
  search = null,
  genre = null
) => {

  const querySearch = (search !== null) ? `&search=${search}` : '';
  const queryGenre = (genre !== null) ? `&genre=${genre}` : '';
  const queryLimit = `&limit=${limit}`
  return {
    type: 'GET_BOOKS',
    payload: Axios.get(`http://localhost:8080/books?page=${page}&sort=${sort}&order=${order}${querySearch}${queryGenre}${queryLimit}`)
  };
};

export const addBook = (title, image, genre, desc, released_at, available) => {
  return {
    type: 'POST_BOOK',
    payload: Axios.post(`http://localhost:8080/books`, {
      title,
      image,
      genre,
      desc,
      released_at,
      available
    })
  };
};

export const updateBook = (book_id, title, image, genre, desc) => {
  return {
    type: 'UPDATE_BOOK',
    payload: Axios.patch(
      `http://localhost:8080/books/${book_id}`, {
        title,
        image,
        genre,
        desc
      }
    )
  }
}

export const deleteBook = (book_id) => {
  return {
    type: 'DELETE_BOOK',
    payload: Axios.delete(`http://localhost:8080/books/${book_id}`)
  }
}

export const getBook = () => {
  return {
    type: 'GET_BOOKS',
    payload: getBooks().payload
  }
}

export const getAvailableBooks = () => {
  return {
    type: 'GET_BOOKS',
    payload: getBooks().payload
  }
}

export const rentBook = (book_id) => {
  return {
    type: 'RENT_BOOK',
    payload: Axios.patch(
      `http://localhost:8080/books/rent/${book_id}`
    )
  }
}

export const returnBook = (book_id) => {
  return {
    type: 'RETURN_BOOK',
    payload: Axios.patch(
      `http://localhost:8080/books/return/${book_id}`
    )
  }
}