import React, { Component } from "react";
import { Tabs, Layout } from "antd";
import { Route } from "react-router-dom";
const { TabPane } = Tabs;
// const TabLayout = (component: Component, ...rest) => {

// };

export default class TabLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { component } = this.props;
    return (
      <Route
        {...this.props}
        render={matchProps => (
          <TabPane {...matchProps}>
            <component {...matchProps} />
          </TabPane>
        )}
      />
    );
  }
}
