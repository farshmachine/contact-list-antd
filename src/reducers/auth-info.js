const updateAuthInfo = (state, action) => {
  if (!state) {
    return {
      username: '',
      password: '',
      isFetching: false,
      isSucceded: undefined,
      isFailed: false,
    };
  }
  switch (action.type) {
    case 'USER_INPUT_HANDLE':
      const { key, value } = action.payload;
      return {
        ...state.authInfo,
        [key]: value,
      };
    case 'USER_LOGOUT_HANDLE':
      return {
        username: '',
        password: '',
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
