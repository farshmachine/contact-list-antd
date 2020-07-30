import React from 'react';

const ServerErrorIndicator = () => {
  return (
    <div className='alert alert-warning my-3' role='alert'>
      <strong>Man down!</strong> Please retry in a few seconds
    </div>
  );
};

const AuthErrorIndicator = () => {
  return (
    <div
      className='alert alert-warning alert-dismissible fade show my-3'
      role='alert'
    >
      <strong>Holy guacamole!</strong> You should check in on some of those
      fields above.
      <button
        type='button'
        className='close'
        data-dismiss='alert'
        aria-label='Close'
      >
        <span aria-hidden='true'>&times;</span>
      </button>
    </div>
  );
};

const ContactListErrorIndicator = () => {
  return (
    <div
      className='alert alert-warning alert-dismissible fade show'
      role='alert'
    >
      Ooops, something went wrong
      <button
        type='button'
        className='close'
        data-dismiss='alert'
        aria-label='Close'
      >
        <span aria-hidden='true'>&times;</span>
      </button>
    </div>
  );
};

export { ServerErrorIndicator, AuthErrorIndicator, ContactListErrorIndicator };
