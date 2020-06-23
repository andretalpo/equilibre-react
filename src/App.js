import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { SignUp, Login, LandingPage, Dashboard, Categories, Expenses } from './pages';
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
    if (loggedUserInfo) {
      this.state.loggedUser = true;
    }

    const userInfo = localStorage.getItem('user-info');
    if (userInfo) {
      this.state.userInfo = JSON.parse(userInfo);
    }
  };

  logUser = (userInfo) => {
    this.setState({
      loggedUser: true,
      userInfo
    });
  }

  logout = () => {
    localStorage.removeItem('logged-user-info');
    this.setState({ userInfo: {} });
    window.location.reload();
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
          logout={this.logout}
        />
        <ProtectedRoute
           exact
           path="/categories"
           loggedUser={this.state.loggedUser}
           component={Categories}
           userInfo={this.state.userInfo}
           logout={this.logout}
        />
        <ProtectedRoute
          exact
          path="/expenses"
          loggedUser={this.state.loggedUser}
          component={Expenses}
          userInfo={this.state.userInfo}
          logout={this.logout}
        />
      </Switch>
    );
  }
}

export default App;
