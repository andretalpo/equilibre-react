
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import './LoginForm.css';
import ApiService from '../../../api/service';
import { Link } from 'react-router-dom';


function LoginForm({ logUser,...props}) {

  const [loginApiErrorMessage, setLoginApiErrorMessage] = useState('');
  const initialState = {
    email: '',
    password: '',
  };

  const onSubmitLogin = async (values, action) => {
    try {
      const logged = await ApiService.loginUser(values);
      
      console.log(`chegou ate aqui`)
      logUser();
      console.log(`passou loguser`)
      localStorage.setItem('logged-user-info', JSON.stringify(logged));
  
      // action.setSubmitting(false);
      
  
      props.history.push('/logged-user');
    } catch (err) {
      setLoginApiErrorMessage(err.response.data.message);
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={onSubmitLogin}
    >
      {({ 
        submitForm, 
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting, }) => (
        <Form>
          <Field
            component={TextField}
            name="email"
            type="email"
            label="Email"
          />
          <br />
          <Field
            component={TextField}
            name="password"
            type="password"
            label="Senha"
          />
          {isSubmitting && <LinearProgress />}
          <br />
          <div>
          <Button
            className="button"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Logar
          </Button>
          <Button
            className="button"
            variant="contained"
            color="secondary"
            disabled={isSubmitting}
            onClick={ value => props.history.push('/')}
          >
            Voltar
          </Button>
          </div>

        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;



