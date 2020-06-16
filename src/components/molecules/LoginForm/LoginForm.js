import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import './LoginForm.css';
import ApiService from '../../../api/service';
import { Button } from '../../atoms';
import formSchema from './LoginForm.schema';

function LoginForm({ logUser, ...props }) {
  const [loginApiErrorMessage, setLoginApiErrorMessage] = useState('');
  const initialState = {
    email: '',
    password: '',
  };

  const onSubmitLogin = async (values, action) => {
    try {
      const logged = await ApiService.loginUser(values);
      logUser();
      localStorage.setItem('logged-user-info', JSON.stringify(logged));
      props.history.push('/dashboard');
    } catch (err) {
      console.log(err.response.data.message)
      setLoginApiErrorMessage(err.response.data.message);
    }
  };

  return (
    <Formik
      initialValues={initialState}
      validationSchema={formSchema}
      onSubmit={onSubmitLogin}
    >
      {
        ({ submitForm, isSubmitting, }) => (
          <Form className="form-container">
              <Field 
                component={TextField}
                name="email"
                type="email"
                label="Email"
              />
              <Field
                component={TextField}
                name="password"
                type="password"
                label="Senha"
              />
              {isSubmitting && <LinearProgress />}

              {loginApiErrorMessage ? <p>{loginApiErrorMessage}</p> : ''}

              <Button className="button-primary button-align" onClick={submitForm}>
                Entrar
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

export default LoginForm;



