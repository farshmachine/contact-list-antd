import React from 'react';

const {
  Provider: ContactsServiceProvider,
  Consumer: ContactsServiceConsumer,
} = React.createContext();

export { ContactsServiceProvider, ContactsServiceConsumer };
