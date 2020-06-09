import React from 'react';
import { Link } from 'react-router-dom';

class GeneralTemplate extends React.Component {
  
  render() {
    return (
        <>
            <Link to="/">Home</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
        </>
        
    );
  }
}

export default GeneralTemplate;
