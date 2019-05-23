import React, { Component, createContext } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { func, object, string } from "prop-types";

export const { Consumer, Provider } = createContext();

export default class RhionRouter extends Component {
  static propTypes = {
    baseApi: string.isRequired,
    routerProps: object,
    using: func // eg BrowserRouter
  };

  static defaultProp = {
    routerProps: {},
    using: BrowserRouter
  };

  render() {
    const { baseApi, children, routerProps, using: Router } = this.props;
    return (
      <Router {...routerProps}>
        <Route>
          {routeProps => (
            <Provider value={{ baseApi, ...routeProps }}>{children}</Provider>
          )}
        </Route>
      </Router>
    );
  }
}
