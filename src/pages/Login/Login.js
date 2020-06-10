import React from 'react';
import { GeneralTemplate } from '../../templates';
import { AuthForm } from '../../components/atoms';

const Signup = props => {
  return (
    <GeneralTemplate>
      <h1>Login Page</h1>
  <AuthForm {...props} />
    </GeneralTemplate>
  );
};

export default Signup;