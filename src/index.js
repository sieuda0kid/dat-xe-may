import React from "react";
import {render} from "react-dom";
import App from './App';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import store from "./store/configureStore.js";
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

render(
    <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
    </Provider>,
  document.getElementById("root")
);
