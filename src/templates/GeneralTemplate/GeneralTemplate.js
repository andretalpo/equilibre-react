import React from 'react';
import { Link } from 'react-router-dom';

class GeneralTemplate extends React.Component {
  
  render() {
    return (
        <div>
            <Link to="/">Home</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
            {this.props.children}

        </div>
        
    );
  }
}

export default GeneralTemplate;
