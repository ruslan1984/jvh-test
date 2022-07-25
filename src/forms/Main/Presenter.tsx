import React, { FC, FormEvent } from 'react';
import { Typography } from 'antd';
import ApplicantIndividualCompanyRelations from '../../modules/ApplicantIndividualCompanyRelations';
import ApplicantIndividualCompanyPositions from '../../modules/ApplicantIndividualCompanyPositions';
import { Button, Form, Input } from 'antd';
import Container from '@mui/material/Container';
import { TSubmitData } from './types';

interface IPresenter {
  submit: (data: TSubmitData) => void;
  textInputError: string;
  textAreaError: string;
  inputChange: (name: string) => (e: FormEvent) => void;
}

const { TextArea } = Input;
const { Text } = Typography;

const Presenter: FC<IPresenter> = ({
  inputChange,
  submit,
  textInputError,
  textAreaError,
}: IPresenter) => (
  <Container>
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={submit}
      autoComplete="off"
    >
      <h1>Form</h1>
      <ApplicantIndividualCompanyRelations />
      <ApplicantIndividualCompanyPositions />
      <Form.Item style={{ marginBottom: 0 }}>
        <Input onChange={inputChange('textInput')} name="textInput" />
        <Text
          style={{ display: 'block', height: '20px', marginBottom: '5px' }}
          type="danger"
        >
          {' '}
          {textInputError}
        </Text>
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }} name="textArea">
        <TextArea onChange={inputChange('textArea')} rows={4} />
      </Form.Item>
      <Text
        style={{ display: 'block', height: '20px', marginBottom: '5px' }}
        type="danger"
      >
        {textAreaError}
      </Text>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </Container>
);

export default Presenter;
