import React, { Component } from "react";
import { Route } from "react-router-dom";

export default class DefaultLayout extends Component {
  render() {
    const { Component, Layout, ...rest } = this.props;
    console.log(rest);
    return (
      <Route
        {...rest}
        render={matchedprops => (
          // <Layout>
          <Component {...matchedprops} />
          // </Layout>
        )}
      />
    );
  }
}
