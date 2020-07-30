import React from 'react';
import { userLogoutHandle } from '../../actions';
import { connect } from 'react-redux';

const LogoutButton = ({ onLogout }) => {
  return (
    <button className='btn btn-secondary text-light' onClick={() => onLogout()}>
      Logout
    </button>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(userLogoutHandle());
    },
  };
};

export default connect(null, mapDispatchToProps)(LogoutButton);
