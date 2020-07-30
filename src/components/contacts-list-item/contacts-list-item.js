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
import InputForm from '../form';
import { Button, Typography } from 'antd';

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

  const onSubmit = ({ name: newName, phone: newPhone }) => {
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
        <InputForm
          onSubmit={onSubmit}
          buttonName={'Edit'}
          nameValue={name}
          phoneValue={phone}
        />
      );
    }
  }

  return (
    <>
      <Typography.Text style={{ fontSize: '18px' }}>{name}</Typography.Text>
      <Typography.Text
        strong
        style={{
          marginLeft: 'auto',
          fontSize: '18px',
          marginRight: '7px',
          color: '#1890ff',
        }}
      >
        {phone}
      </Typography.Text>

      <Button.Group>
        <Button type='danger' onClick={() => onDelete(data)}>
          <i className='fa fa-trash-o'></i>
        </Button>
        <Button
          onClick={() => {
            onEdit({ name, id, phone });
          }}
        >
          <i className='fa fa-edit'></i>
        </Button>
      </Button.Group>
    </>
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
