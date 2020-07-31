import 'antd/dist/antd.css';
import { Layout } from 'antd';
import React from 'react';
import SiteHeader from '../site-header';
import { ContactsPage, LoginPage, PageNotFound } from '../../pages';
import { Route, Switch } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <>
      <Layout style={{ height: '100vh' }}>
        <Header>
          <SiteHeader />
        </Header>
        <Content style={{ padding: ' 50px' }}>
          <Switch>
            <Route path='/' component={LoginPage} exact />
            <Route path='/contacts' component={ContactsPage} />
            <Route component={PageNotFound} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          React/Redux simple app made by Farshmachine
        </Footer>
      </Layout>
    </>
  );
};

export default App;
