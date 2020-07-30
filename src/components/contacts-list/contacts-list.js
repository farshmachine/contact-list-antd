import './contacts-list.css';
import React, { useEffect } from 'react';
import { withContactsService } from '../hoc-helpers';
import { fetchContacts, filterContactsHandle } from '../../actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ContactsListItem from '../contacts-list-item';
import Spinner from '../spinner';
import ContactAddForm from '../contact-add-form';

const ContactsList = ({
  data,
  fetchContacts,
  contactIsFetching,
  filterContacts,
}) => {
  const { isFetching, isFailed, items, filter } = data;
  let overlay = null;

  useEffect(() => {
    fetchContacts();
  }, []);

  if (isFetching) {
    return (
      <>
        <p className='h3 text-center mt-3'>Loading enrties...</p>
        <Spinner />
      </>
    );
  }

  if (isFailed) {
    return <p>Error</p>;
  }

  if (items.length === 0) {
    return (
      <>
        <p className='h5 text-center mt-3'>Create your first entry!</p>
        <ContactAddForm />
      </>
    );
  }

  if (contactIsFetching) {
    overlay = (
      <div className='overlay'>
        Working...
        <Spinner />
      </div>
    );
  }

  return (
    <div className='contacts-list-container'>
      {overlay}
      <input
        placeholder='Search'
        className='form-control'
        type='text'
        pattern='[a-zA-Zа-яА-ЯёЁ0-9]*'
        onInput={(e) => {
          filterContacts(e.target.value);
        }}
      />
      <ul className='list-group'>
        {items.map((item) => {
          if (filter) {
            if (item.name.toLowerCase().match(filter.toLowerCase())) {
              return (
                <li key={item.id} className='list-group-item my-1'>
                  <ContactsListItem data={item} />
                </li>
              );
            }
          } else {
            return (
              <li key={item.id} className='list-group-item my-1'>
                <ContactsListItem data={item} />
              </li>
            );
          }

          return;
        })}
      </ul>
      <ContactAddForm />
    </div>
  );
};

const mapStateToProps = ({ data, contact: { isFetching } }) => {
  return {
    data,
    contactIsFetching: isFetching,
  };
};

const mapDispatchToProps = (dispatch, { contactsService }) => {
  return {
    fetchContacts: () => dispatch(fetchContacts(contactsService)),
    filterContacts: (string) => dispatch(filterContactsHandle(string)),
  };
};

export default compose(
  withContactsService(),
  connect(mapStateToProps, mapDispatchToProps)
)(ContactsList);
