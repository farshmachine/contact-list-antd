import React, { useEffect } from 'react';
import LoginForm from '../components/login-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Typography, Row, Col } from 'antd';

const { Title } = Typography;

const LoginPage = ({ isLoggedIn }) => {
  useEffect(() => {
    if (isLoggedIn) {
      return () => <Redirect to='/' />;
    }
  }, [isLoggedIn]);

  return (
    <Row style={{ margin: '16px 0' }}>
      <Col
        xs={{ span: 22, offset: 1 }}
        md={{ span: 12, offset: 6 }}
        lg={{ span: 8, offset: 8 }}
        xl={{ span: 6, offset: 9 }}
      >
        <Title style={{ textAlign: 'center' }}>Login page</Title>
        <div className=''>
          <LoginForm />
        </div>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ authInfo: { isSucceded } }) => ({
  isLoggedIn: isSucceded,
});

export default connect(mapStateToProps)(LoginPage);
