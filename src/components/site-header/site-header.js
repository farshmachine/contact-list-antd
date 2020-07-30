import './site-header.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogoutButton from '../logout-button/logout-button';
import { Row } from 'antd';

const SiteHeader = ({ isLoggedIn }) => {
  const logout = isLoggedIn ? <LogoutButton /> : null;

  return (
    <Row justify='space-between'>
      <div className='logo'>
        {' '}
        <Link to='/' className='logo'>
          <i className='fa fa-address-card' />
          Contacts
        </Link>
      </div>
      {logout}
    </Row>
  );
};

const mapStateToProps = ({ authInfo: { isSucceded } }) => ({
  isLoggedIn: isSucceded,
});

export default connect(mapStateToProps)(SiteHeader);
