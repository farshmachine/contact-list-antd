import './contacts-list-item.css';
import React from 'react';
import {
  deleteContactHandle,
  editContactHandle,
  fetchEditContactRequest,
  editContactCanceled,
} from '../../actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withContactsService } from '../hoc-helpers';
import Form from '../form';

const ContactsListItem = (props) => {
  const {
    data,
    onDelete,
    onEdit,
    isEditing,
    onEditSubmit,
    onEditCancel,
  } = props;
  const { id, name, phone } = data;

  const onSubmit = (e) => {
    e.preventDefault();
    const newName = e.target.elements['username'].value;
    const newPhone = e.target.elements['phone'].value;
    Array.from(e.target.elements).forEach((el) => (el.value = ''));

    if (
      newName.length > 0 &&
      newPhone.length > 0 &&
      (newName !== name || newPhone !== phone)
    ) {
      onEditSubmit({ name: newName, phone: newPhone, id });
    } else {
      onEditCancel();
    }
  };

  if (isEditing) {
    if (id === isEditing.id) {
      return (
        <Form
          onSubmit={(e) => onSubmit(e)}
          buttonName={'Edit'}
          nameValue={name}
          phoneValue={phone}
        />
      );
    }
  }

  return (
    <div className='d-flex justify-content-between'>
      <span className='item-info'>
        {name} <span className='text-primary'>{phone}</span>
      </span>
      <div>
        <button
          type='button'
          className='btn btn-outline-danger mx-1'
          onClick={() => onDelete(data)}
        >
          <i className='fa fa-trash-o'></i>
        </button>
        <button
          type='button'
          className='btn btn-outline-warning mx-1'
          onClick={() => {
            onEdit({ name, id, phone });
          }}
        >
          <i className='fa fa-edit'></i>
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isEditing: state.contact.editContact,
});

const mapDispatchToProps = (dispatch, { contactsService }) => {
  return {
    onDelete: (contact) =>
      dispatch(deleteContactHandle(contact, contactsService)),
    onEdit: (contact) => {
      dispatch(editContactHandle(contact));
    },
    onEditSubmit: (contact) => {
      dispatch(fetchEditContactRequest(contact, contactsService));
    },
    onEditCancel: () => {
      dispatch(editContactCanceled());
    },
  };
};

export default compose(
  withContactsService(),
  connect(mapStateToProps, mapDispatchToProps)
)(ContactsListItem);
