
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
    const response = await ApiService.signUpUser(values);
    props.history.push('/login');//Sucesso
    setSignApiErrorMessage(message);//falha
  };

  return (
    <Formik
      initialValues={initialState}
      validationSchema={formSchema}
      onSubmit={onSubmitSignUp}
    >
      {
        ({ submitForm, isSubmitting }) => (
          <Form>
            <div className="flex">
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
              <Button
                className="button"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Cadastrar
              </Button>

              <Button
                className="button"
                variant="contained"
                color="secondary"
                disabled={isSubmitting}
                onClick={() => props.history.push('/')}
              >
                Voltar
              </Button>
            </div>
          </Form>
        )
      }
    </Formik>
  );
}

export default SignForm;