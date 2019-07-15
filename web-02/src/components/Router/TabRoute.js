import React, { Component } from "react";
import { Tabs, Layout } from "antd";
import { Route } from "react-router-dom";
const { TabPane } = Tabs;

const TabRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <TabPane {matchProps.title}>
          <Component {...matchProps} />
        </TabPane>
      )}
    />
  );
};
