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
    default:
      return state;
  }
};

export default books;