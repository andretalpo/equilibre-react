import React from 'react';
import './AuthTemplate.css';
import logo6 from '../../assets/images/logo6.jpg';

class AuthTemplate extends React.Component {
  
  render() {
    return (
        <div className="main-container">
            <div className="left-container"></div>
            <div className="right-container">
                <h1>Equilibre</h1>
                {this.props.children}
            </div>
        </div>
    );
  }
}

export default AuthTemplate;