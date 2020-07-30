import './form.css';

import React from 'react';

const Form = (props) => {
  const {
    status = null,
    buttonName,
    onSubmit,
    nameValue = null,
    phoneValue = null,
  } = props;

  return (
    <>
      <form
        className='form-group d-flex'
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <input
          type='text'
          className='form-control mr-1'
          id='username'
          placeholder='Contact name'
          autoComplete='off'
          defaultValue={nameValue}
        />
        <input
          type='tel'
          className='form-control mr-1'
          id='phone'
          placeholder='Contact number'
          autoComplete='off'
          defaultValue={phoneValue}
        />
        <button className='btn btn-success'>{buttonName}</button>
      </form>
      {status}
    </>
  );
};

export default Form;
