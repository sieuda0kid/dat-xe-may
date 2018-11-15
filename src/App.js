import React, { Component } from 'react';
import {Route, Switch, Redirect } from 'react-router-dom';
import Home from "./layouts/Home/Home.jsx";
import Driver from "./layouts/Driver/Driver.jsx";
import Admin from "./layouts/Admin/Admin.jsx";

class App extends Component {
  render() {
    return (
      <Switch>
		<Route path={"/Driver"} component={Driver} />
		<Route path={"/Admin"} component={Admin} />
		<Route path={"/"} component={Home} />
		<Redirect to="/" />
	  </Switch>
    );
  }
}

export default App;
