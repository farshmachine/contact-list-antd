import './contacts-list.css';
import React, { useEffect } from 'react';
import { withContactsService } from '../hoc-helpers';
import { fetchContacts, filterContactsHandle } from '../../actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ContactsListItem from '../contacts-list-item';
import Spinner from '../spinner';
import ContactAddForm from '../contact-add-form';
import { Typography, Input, List } from 'antd';

const { Title } = Typography;

const ContactsList = (props) => {
  const { data, fetchContacts, contactIsFetching, filterContacts } = props;
  const { isFetching, items, filter } = data;

  useEffect(() => {
    fetchContacts();
  }, []);

  const title =
    items.length === 0 ? (
      <Title level={3} style={{ textAlign: 'center' }}>
        Create your first entry
      </Title>
    ) : null;

  const filterInput = (
    <Input
      placeholder='Filter'
      onInput={(e) => {
        filterContacts(e.target.value.toString());
      }}
    />
  );

  const addForm = <ContactAddForm />;

  return (
    <Spinner isLoading={isFetching || contactIsFetching}>
      <List
        style={{ backgroundColor: 'white' }}
        header={title || filterInput}
        footer={addForm}
        bordered
        dataSource={items}
        renderItem={(item) => {
          if (
            item.name.toLowerCase().match(new RegExp(`${filter.toLowerCase()}`))
          ) {
            return (
              <List.Item>
                <ContactsListItem data={item} />
              </List.Item>
            );
          }
        }}
      />
    </Spinner>
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
