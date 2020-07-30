import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fetchUserAuth } from '../../actions';
import { withAuthService } from '../hoc-helpers';
import { Redirect } from 'react-router-dom';
import Spinner from '../spinner';
import { ServerErrorIndicator, AuthErrorIndicator } from '../error-indicators';
import './login-form.css';

const LoginForm = (props) => {
  const { serverError, loginError, fetchUserAuth } = props;

  const onFinish = (values) => {
    fetchUserAuth(values);
  };

  return (
    <Form
      name='normal_login'
      className='login-form'
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name='username'
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Username'
        />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='login-form-button'>
          Log in
        </Button>
      </Form.Item>
      {serverError}
      {loginError}
    </Form>
  );
};

const LoginFormContainer = (props) => {
  const { loading, hasError, isLoggedIn } = props;

  let loginError = null;
  const serverError = hasError ? <ServerErrorIndicator /> : null;

  if (isLoggedIn) {
    return <Redirect to='/contacts' />;
  }

  if (isLoggedIn === false) {
    loginError = <AuthErrorIndicator />;
  }

  return (
    <Spinner isLoading={loading}>
      <LoginForm {...props} serverError={serverError} loginError={loginError} />
    </Spinner>
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
    fetchUserAuth: (creds) => dispatch(fetchUserAuth(creds, authService)),
  };
};

export default compose(
  withAuthService(),
  connect(mapStateToProps, mapDispatchToProps)
)(LoginFormContainer);
