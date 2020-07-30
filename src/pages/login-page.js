import React, { useEffect } from 'react';
import LoginForm from '../components/login-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const LoginPage = ({ isLoggedIn }) => {
  useEffect(() => {
    if (isLoggedIn) {
      return () => <Redirect to='/' />;
    }
  }, [isLoggedIn]);

  return (
    <div className='jumbotron'>
      <h1 className='text-center'>Login</h1>
      <div className='col-xs-10 col-sm-6 col-md-6 col-lg-3 mx-auto'>
        <LoginForm />
      </div>
    </div>
  );
};

const mapStateToProps = ({ authInfo: { isSucceded } }) => ({
  isLoggedIn: isSucceded,
});

export default connect(mapStateToProps)(LoginPage);
