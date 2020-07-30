import React from 'react';
import { Alert } from 'antd';

const ServerErrorIndicator = () => {
  return (
    <Alert
      showIcon
      message='Man down! Please retry in a few seconds'
      type='warning'
      closable
    />
  );
};

const AuthErrorIndicator = () => {
  return (
    <Alert
      showIcon
      message='Holy guacamole! You should check in on some of those
    fields above.'
      type='warning'
      closable
    />
  );
};

const ContactListErrorIndicator = () => {
  return (
    <Alert
      showIcon
      message='Oops, something went wrong'
      type='warning'
      closable
      description=''
    />
  );
};

export { ServerErrorIndicator, AuthErrorIndicator, ContactListErrorIndicator };
