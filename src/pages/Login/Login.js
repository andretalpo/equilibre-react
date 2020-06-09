import React from 'react';
import { GeneralTemplate } from '../../components/templates';
import { AuthForm } from '../../components/atoms';

const Signup = props => {
  return (
    <GeneralTemplate>
      <AuthForm {...props} />
    </GeneralTemplate>
  );
};

export default Signup;