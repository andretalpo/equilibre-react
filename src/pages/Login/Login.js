import React from 'react';
import { AuthTemplate } from '../../templates';
import { LoginForm } from '../../components/atoms';

const Login = props => {
  return (
    <AuthTemplate>
      <LoginForm {...props} />
    </AuthTemplate>
  );
};

export default Login;