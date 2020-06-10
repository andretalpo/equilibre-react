import React, { Component } from 'react';
import ApiService from '../../api/service';
import { Link } from 'react-router-dom'; 

class AuthPage extends Component {



  componentDidMount() {
    
  }

  render() {
    ApiService.test();
    return (
          <div className='form-align'>
              <h1>LOGOU!!!!!!!!</h1>
              <Link to="/logged-user">Loged-User</Link>

          </div>
    );

  }
};

export default AuthPage;