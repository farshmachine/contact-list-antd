import React from 'react';
import './header.css';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogoutButton from '../logout-button/logout-button';

const Header = ({ isLoggedIn }) => {
  const logout = isLoggedIn ? <LogoutButton /> : null;

  return (
    <nav className='navbar navbar-light bg-secondary'>
      <Link to='/' className='navbar-brand text-light'>
        <i className='fa fa-address-card' />
        Contacts
      </Link>
      {logout}
    </nav>
  );
};

const mapStateToProps = ({ authInfo: { isSucceded } }) => ({
  isLoggedIn: isSucceded,
});

export default connect(mapStateToProps)(Header);
