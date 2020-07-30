import React from 'react';
import Header from '../header';
import { ContactsPage, LoginPage, PageNotFound } from '../../pages';
import { Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path='/' component={LoginPage} exact />
        <Route path='/contacts' component={ContactsPage} />
        <Route component={PageNotFound} />
      </Switch>
    </>
  );
};

export default App;
