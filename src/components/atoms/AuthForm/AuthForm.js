import React, { useState } from 'react';
import { Formik } from 'formik';
import './AuthForm.css';
import ApiService from '../../../api/service';


const AuthForm = ({logUser, ...props}) => {

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
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
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
          isSubmitting,plsalles
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default AuthForm;