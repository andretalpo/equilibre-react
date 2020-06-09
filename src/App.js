import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { Home, SignUp, AuthPage, Login } from './pages';

class App extends Component {
  
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props => <Home {...props} />}
        />
        <Route
          exact
          path="/signup"
          render={props => <SignUp {...props} />}
        />
        <Route
          exact
          path="/login"
          render={props => <Login />}
        />
      </Switch>
    );
  }
}

export default App;
