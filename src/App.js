import React, { Component } from 'react';
import {Route, Switch, Redirect } from 'react-router-dom';
import Home from "./layouts/Home/Home.jsx";

class App extends Component {
  render() {
    return (
      <Switch>
		<Route path={"/"} component={Home} />
		<Redirect to="/" />
	  </Switch>
    );
  }
}

export default App;
