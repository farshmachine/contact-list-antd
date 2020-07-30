import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { userInputHandle, fetchUserAuth } from '../../actions';
import { withAuthService } from '../hoc-helpers';
import { Redirect } from 'react-router-dom';
import Spinner from '../spinner';
import { ServerErrorIndicator, AuthErrorIndicator } from '../error-indicators';

const LoginForm = (props) => {
  const { serverError, loginError, userInputHandle, fetchUserAuth } = props;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        fetchUserAuth();
      }}
    >
      <div className='form-group'>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          className='form-control'
          id='username'
          autoComplete='off'
          onInput={(e) =>
            userInputHandle({
              key: e.target.id,
              value: e.target.value,
            })
          }
        />
      </div>
      <div className='form-group'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          className='form-control'
          id='password'
          autoComplete='off'
          onInput={(e) =>
            userInputHandle({
              key: e.target.id,
              value: e.target.value,
            })
          }
        />
        {serverError}
        {loginError}
      </div>
      <button type='submit' className='btn btn-primary d-block mx-auto'>
        Login
      </button>
    </form>
  );
};

const LoginFormContainer = (props) => {
  const { loading, hasError, isLoggedIn } = props;

  let loginError = null;
  const serverError = hasError ? <ServerErrorIndicator /> : null;

  if (loading) {
    return <Spinner />;
  }

  if (isLoggedIn) {
    return <Redirect to='/contacts' />;
  } else if (isLoggedIn === false) {
    loginError = <AuthErrorIndicator />;
  }

  return (
    <LoginForm {...props} serverError={serverError} loginError={loginError} />
  );
};

const mapStateToProps = (state) => {
  const {
    authInfo: { isFetching, isSucceded, isFailed },
  } = state;
  return {
    loading: isFetching,
    isLoggedIn: isSucceded,
    hasError: isFailed,
  };
};

const mapDispatchToProps = (dispatch, { authService }) => {
  return {
    userInputHandle: (data) => dispatch(userInputHandle(data)),
    fetchUserAuth: () => dispatch(fetchUserAuth(authService)),
  };
};

export default compose(
  withAuthService(),
  connect(mapStateToProps, mapDispatchToProps)
)(LoginFormContainer);
