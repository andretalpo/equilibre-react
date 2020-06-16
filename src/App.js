import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { Home, SignUp, AuthPage, Login, LandingPage, Dashboard } from './pages';
import { ProtectedRoute } from './components/authentication';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      loggedUser: null,
    };

    this.verifyLoggedUser();
  }

  verifyLoggedUser = async () => {
    const loggedUserInfo = localStorage.getItem('logged-user-info');

    // eslint-disable-next-line react/no-direct-mutation-state
    if (loggedUserInfo) {
      this.state.loggedUser = true;
    }
  };

  logUser = () => {
    this.setState({
      loggedUser: true,
    });
  }
  
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={props => <LandingPage {...props} />}
        />
        <Route
          exact
          path="/signup"
          render={props => <SignUp {...props}/>}
        />
        <Route
          exact
          path="/login"
          render={props => <Login {...props} logUser={this.logUser}/>}
        />
        <ProtectedRoute
          exact
          path="/dashboard"
          loggedUser={this.state.loggedUser}
          component={Dashboard}
          userInfo={this.state.userInfo}
        />
        <Route
          exact
          path="/auth-route"
          render={props => <AuthPage {...props}/>}
        />
      </Switch>
    );
  }
}

export default App;
