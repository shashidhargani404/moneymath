import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'

import './components/user/SignupLogin.css'
import LoginPage from './components/user/LoginPage'
import Signup from './components/user/Signup';
import MoneyMath from './components/money-math/MoneyMath'

function App(props) {
  return (
    <BrowserRouter>
      { !_.isEmpty(props.user) ? <Route path="/" component={MoneyMath} exact={true} /> : <Route path="/" component={LoginPage} exact={true} /> }
  
      <Route path="/signup" component={Signup} />
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App);