const initialState = {
  bookList: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false
};

const books = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOOKS_PENDING':
      return {
        ...state,
        isLoading: true,
          isFulfilled: false,
          isRejected: false,
      };
    case 'GET_BOOKS_REJECTED':
      return {
        ...state,
        isLoading: false,
          isRejected: true,
      };
    case 'GET_BOOKS_FULFILLED':
      return {
        ...state,
        isLoading: false,
          isFulfilled: true,
          bookList: action.payload.data.result,
      };
    case 'POST_BOOK_PENDING':
      return {
        ...state,
        isLoading: true,
          isFulfilled: false,
          isRejected: false,
      };
    case 'POST_BOOK_REJECTED':
      return {
        ...state,
        isLoading: false,
          isRejected: true,
      };
    case 'POST_BOOK_FULFILLED':
      state.bookList.push(action.payload.data.result)
      return {
        isLoading: false,
          isFulfilled: true,
          bookList: state.bookList,
      };
    case 'UPDATE_BOOK_PENDING':
      return {
        ...state,
        isLoading: true,
          isFulfilled: false,
          isRejected: false,
      };
    case 'UPDATE_BOOK_REJECTED':
      return {
        ...state,
        isLoading: false,
          isRejected: true,
      };
    case 'UPDATE_BOOK_FULFILLED':
      // const dataAfterUpdate = state.bookList.map(book => {
      //   // eslint-disable-next-line eqeqeq
      //   if (book.book_id == action.payload.data.result.book_id) {
      //     return action.payload.data.result;
      //   }
      //   return book;
      // });
      return {
        ...state,
        isLoading: false,
          isFulfilled: true,
          bookList: action.payload.data.result
      };
    case 'DELETE_BOOK_PENDING':
      return {
        ...state,
        isLoading: true,
          isRejected: false,
          isFulfilled: false,
      };
    case 'DELETE_BOOK_REJECTED':
      return {
        ...state,
        isLoading: false,
          isRejected: true,
      };
    case 'DELETE_BOOK_FULFILLED':
      // eslint-disable-next-line eqeqeq
      const dataAfterDelete = state.bookList.filter(book => book.book_id != action.payload.data.result.book_id);
      return {
        ...state,
        isLoading: false,
          isFulfilled: true,
          bookList: dataAfterDelete
      }
      default:
        return state;
  }
};

export default books;