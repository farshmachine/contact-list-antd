import './logout-button.css';
import React from 'react';
import { Button } from 'antd';
import { userLogoutHandle } from '../../actions';
import { connect } from 'react-redux';

const LogoutButton = ({ onLogout }) => {
  return (
    <Button
      size='large'
      ghost
      onClick={onLogout}
      style={{ margin: ' auto 0 auto auto' }}
    >
      Logout
    </Button>
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
