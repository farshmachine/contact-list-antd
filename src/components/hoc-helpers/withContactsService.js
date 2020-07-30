import React from 'react';
import { ContactsServiceConsumer } from '../services-context';

const withContactsService = () => (Wrapped) => {
  return (props) => {
    return (
      <ContactsServiceConsumer>
        {(contactsService) => {
          return <Wrapped {...props} contactsService={contactsService} />;
        }}
      </ContactsServiceConsumer>
    );
  };
};

export default withContactsService;
