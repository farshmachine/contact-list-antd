const updateAuthInfo = (state, action) => {
  if (!state) {
    return {
      username: '',
      isFetching: false,
      isSucceded: undefined,
      isFailed: false,
    };
  }
  switch (action.type) {
    case 'SAVE_USERNAME':
      return {
        ...state.authInfo,
        username: action.payload,
      };
    case 'USER_LOGOUT_HANDLE':
      return {
        username: '',
        isFetching: false,
        isSucceded: undefined,
        isFailed: false,
      };
    case 'FETCH_USER_AUTH_REQUEST':
      return {
        ...state.authInfo,
        isFetching: true,
      };
    case 'FETCH_USER_AUTH_SUCCESS':
      return {
        ...state.authInfo,
        isFetching: false,
        isSucceded: true,
      };
    case 'FETCH_USER_AUTH_FAILED':
      return {
        ...state.authInfo,
        isFetching: false,
        isFailed: true,
      };
    case 'FETCH_USER_AUTH_INVALID':
      return {
        ...state.authInfo,
        isFetching: false,
        isSucceded: false,
      };
    default:
      return state.authInfo;
  }
};

export default updateAuthInfo;
