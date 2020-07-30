import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ContactsList from '../components/contacts-list';
import { Row, Col } from 'antd';

const ContactsPage = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Redirect to='/' />;
  }

  return (
    <Row>
      <Col
        xs={{ span: 24, offset: 0 }}
        sm={{ span: 22, offset: 1 }}
        md={{ span: 18, offset: 3 }}
        lg={{ span: 14, offset: 5 }}
        xl={{ span: 10, offset: 7 }}
      >
        <ContactsList />
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ authInfo: { isSucceded } }) => ({
  isLoggedIn: isSucceded,
});

export default connect(mapStateToProps)(ContactsPage);
