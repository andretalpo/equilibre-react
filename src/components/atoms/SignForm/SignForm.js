
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import './SignForm.css';
import ApiService from '../../../api/service';


function SignForm({...props}) {

    const [loginApiErrorMessage, setLoginApiErrorMessage] = useState('');
    const initialState = {
      name: '',
      email: '',
      password: '',
    };
  
    const onSubmitSignUp = async (values, action) => {
      try {
        const signedUp = await ApiService.signUpUser(values);
        
      
    
        props.history.push('/login');
      } catch (err) {
        setLoginApiErrorMessage(err.response.data.message);
      }
    };

  return (
    <Formik
      initialValues={{
        name: '',  
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
      onSubmit={onSubmitSignUp}
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
            name="name"
            type="text"
            label="Nome"
          />
          <br />
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
          <Button
            className="button"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
            onClick={submitForm}
          >
            Criar
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default SignForm;



