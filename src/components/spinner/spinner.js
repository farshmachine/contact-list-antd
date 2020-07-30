import React from 'react';
import { Spin } from 'antd';
import './spinner.css';

const Spinner = (props) => {
  const { children, isLoading } = props;
  return <Spin spinning={isLoading}>{children}</Spin>;
};

export default Spinner;
