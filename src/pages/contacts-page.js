import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ContactsList from '../components/contacts-list';

const ContactsPage = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Redirect to='/' />;
  }

  return (
    <div className='col-xs-11 col-sm-9 col-md-8 col-lg-5 mx-auto my-3'>
      <ContactsList />
    </div>
  );
};

const mapStateToProps = ({ authInfo: { isSucceded } }) => ({
  isLoggedIn: isSucceded,
});

export default connect(mapStateToProps)(ContactsPage);
