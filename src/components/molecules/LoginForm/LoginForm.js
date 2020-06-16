
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { LinearProgress } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import './LoginForm.css';
import ApiService from '../../../api/service';
import { Button } from '../../atoms';


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
      console.log(err.response.data.message)
      if(err.toString().includes('401')){
        console.log('401')
        setLoginApiErrorMessage(err.response.data.message);
      } else {
        setLoginApiErrorMessage("Internal Server Error");
      }
      
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
          errors.email = 'Requerido';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = 'Email inválido';
        }
        return errors;
      }}
      onSubmit={onSubmitLogin}
    >
      {({ 
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting, }) => (
        <Form >
          <Field
            component={TextField}
            name="email"
            error={errors.email|| loginApiErrorMessage}
            type="email"
            label="Email"
          />
          <br />
          <Field
            component={TextField}
            error={errors.password || loginApiErrorMessage}
            name="password"
            type="password"
            label="Senha"
          />
          {isSubmitting && <LinearProgress />}
          <br />
          <div>
          <Button
            className="button-primary"
            onClick={handleSubmit}
          >
            Logar
          </Button>
          <Button
            className="button-secondary"
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



