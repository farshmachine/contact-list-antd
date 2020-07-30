import updateAuthInfo from './auth-info';
import updateData from './data';
import updateContact from './contact';

const reducer = (state, action) => {
  return {
    authInfo: updateAuthInfo(state, action),
    data: updateData(state, action),
    contact: updateContact(state, action),
  };
};

export default reducer;
