import React, { Component } from 'react';
import { GeneralTemplate } from '../../components/templates';
import { AuthForm } from '../../components/atoms';
import './SignUp.css';

class SignUp extends Component {

  componentWillUnmount() {
    
  }

  render() {
   
    return (
        <GeneralTemplate>
            <AuthForm/>
        </GeneralTemplate>
        
    );

  }
};

export default SignUp;