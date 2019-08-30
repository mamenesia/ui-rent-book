const initialState = {
  historyData: [],
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
};

const history = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_HISTORY_PENDING':
      return {
        ...state,
        isLoading: true,
          isFulfilled: false,
          isRejected: false
      };
    case 'GET_HISTORY_REJECTED':
      return {
        ...state,
        isLoading: false,
          isRejected: true,
      };
    case 'GET_HISTORY_FULFILLED':
      return {
        ...state,
        isLoading: false,
          isFulfilled: true,
          historyData: action.payload.data.result
      };
    default:
      return state;
  }
}

export default history;