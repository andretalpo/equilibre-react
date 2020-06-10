import React, { Component } from 'react';
import { GeneralTemplate } from '../../templates';
import { AuthForm } from '../../components/atoms';
import './SignUp.css';

class SignUp extends Component {

  componentWillUnmount() {
    
  }

  render() {
   
    return (
        <GeneralTemplate>
          <h1>SignUp Page</h1>
          <AuthForm/>
        </GeneralTemplate>
        
    );

  }
};

export default SignUp;