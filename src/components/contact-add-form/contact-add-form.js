import './contact-add-form.css';
import React from 'react';
import { connect } from 'react-redux';
import { addContactHandle } from '../../actions';
import { compose } from 'redux';
import { withContactsService } from '../hoc-helpers';
import { ContactListErrorIndicator } from '../error-indicators';
import InputForm from '../form';

const ContactAddForm = ({ addContact, requestStatus }) => {
  const status = requestStatus === false ? <ContactListErrorIndicator /> : null;

  const onSubmit = ({ name, phone }) => {
    if (name.length > 0 && phone.length > 0) {
      addContact(name, phone);
    }
  };

  return <InputForm onSubmit={onSubmit} status={status} buttonName={'Add'} />;
};

const mapStateToProps = (state) => {
  return {
    requestStatus: state.contact.isSucceded,
  };
};

const mapDispatchToProps = (dispatch, { contactsService }) => {
  return {
    addContact: (name, phone) =>
      dispatch(addContactHandle({ name, phone }, contactsService)),
  };
};

export default compose(
  withContactsService(),
  connect(mapStateToProps, mapDispatchToProps)
)(ContactAddForm);
