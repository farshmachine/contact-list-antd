import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthService, ContactsService } from './services';
import {
  AuthServiceProvider,
  ContactsServiceProvider,
} from './components/services-context';

const authService = new AuthService();
const contactsService = new ContactsService();

ReactDOM.render(
  <Provider store={store}>
    <AuthServiceProvider value={authService}>
      <ContactsServiceProvider value={contactsService}>
        <Router>
          <App />
        </Router>
      </ContactsServiceProvider>
    </AuthServiceProvider>
  </Provider>,
  document.querySelector('#root')
);
