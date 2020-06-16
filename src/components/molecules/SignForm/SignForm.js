import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import './SignForm.css';
import ApiService from '../../../api/service';
import formSchema from './SignForm.schema';

function SignForm({ ...props }) {
  const [signApiErrorMessage, setSignApiErrorMessage] = useState('');
  const initialState = {
    name: '',
    email: '',
    password: '',
  };

  const onSubmitSignUp = async (values, action) => {
    try {
      await ApiService.signUpUser(values);
      props.history.push('/login');
    } catch (err) {
      console.log(err);
      setSignApiErrorMessage(err.response.data.message);
    }
  };

  return (
    <Formik
      initialValues={initialState}
      validationSchema={formSchema}
      onSubmit={onSubmitSignUp}
    >
      {
        ({ submitForm, isSubmitting }) => (
          <Form className="form-container">
            <Field
              component={TextField}
              name="name"
              type="text"
              label="Nome" />
            <Field
              component={TextField}
              name="email"
              type="email"
              label="Email" />
            <Field
              component={TextField}
              name="password"
              type="password"
              label="Senha" />
            {isSubmitting && <LinearProgress />}

            {signApiErrorMessage ? <p>{signApiErrorMessage}</p> : ''}

            <Button className="button-primary button-align" onClick={submitForm}>
              Cadastrar
            </Button>

            <Button className="button-secondary button-align" onClick={value => props.history.push('/')}>
              Voltar
            </Button>
          </Form>
        )
      }
    </Formik>
  );
}

export default SignForm;