const initialState = {
  userData: [],
  isLoading: false,
  isRejected: false,
  isFulfilled: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_USER_PENDING':
      return {
        ...state,
        isLoading: true,
          isFulfilled: false,
          isRejected: false,
      };
    case 'REGISTER_USER_REJECTED':
      return {
        ...state,
        isLoading: false,
          isRejected: true,
      };
    case 'REGISTER_USER_FULFILLED':
      console.log(action.payload)
      return {
        ...state,
        isLoading: false,
          isFulfilled: true,
          userData: action.payload
      };
    case 'LOGIN_USER_PENDING':
      return {
        ...state,
        isLoading: true,
          isFulfilled: false,
          isRejected: false,
      };
    case 'LOGIN_USER_REJECTED':
      return {
        ...state,
        isLoading: false,
          isRejected: true,
      };
    case 'LOGIN_USER_FULFILLED':
      return {
        ...state,
        isLoading: false,
          isFulfilled: true,
          userData: action.payload
      }
      default:
        return state;
  }
}

export default user;