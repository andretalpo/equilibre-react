import React from 'react';
import { AuthTemplate } from '../../templates';
import { SignUpForm } from '../../components/molecules';

const SignUp = props => {
  return (
    <AuthTemplate>
      <SignUpForm {...props} />
    </AuthTemplate>
  );
};

export default SignUp;