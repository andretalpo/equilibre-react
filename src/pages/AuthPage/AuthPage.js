import React, { Component } from 'react';
import { AuthForm } from '../../components/atoms';

class AuthPage extends Component {

  componentWillUnmount() {
    
  }

  render() {
   
    return (
          <div className='form-align'>
              <AuthForm />
          </div>
    );

  }
};

export default AuthPage;