import './form.css';
import { Form, Input, Button } from 'antd';
import React from 'react';

const InputForm = (props) => {
  const [form] = Form.useForm();
  const {
    status = null,
    buttonName,
    onSubmit,
    nameValue = '',
    phoneValue = '',
  } = props;

  return (
    <>
      <Form
        form={form}
        layout='inline'
        onFinish={(values) => {
          onSubmit(values);
          form.resetFields();
        }}
        initialValues={{ name: nameValue, phone: phoneValue }}
      >
        <Form.Item name='name'>
          <Input placeholder='name' autoComplete='off' />
        </Form.Item>
        <Form.Item name='phone'>
          <Input
            placeholder='phone'
            autoComplete='off'
            pattern='^(\+7|8)\s?\(?\d{3}\)?\s?-?\d{3}\s?-?\d{2}\s?-?\d{2}'
          />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            {buttonName}
          </Button>
        </Form.Item>
        {status}
      </Form>
    </>
  );
};

export default InputForm;
