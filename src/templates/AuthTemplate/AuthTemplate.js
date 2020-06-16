import React from 'react';
import './AuthTemplate.css';
import logo from '../../assets/images/logo8.png';

class AuthTemplate extends React.Component {
  
  render() {
    return (
        <div className="main-container">
            <div className="left-container"></div>
            <div className="right-container">
                <img src={logo} alt='logo'></img>
                {this.props.children}
            </div>
        </div>
    );
  }
}

export default AuthTemplate;