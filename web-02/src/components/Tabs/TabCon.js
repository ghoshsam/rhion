import React, { Component } from "react";
import { Tabs, Layout } from "antd";
import { func, object, array } from "prop-types";
const { TabPane } = Tabs;
const { Content } = Layout;

export default class TabCon extends Component {
  static propTypes = {
    tabs: array
  };
  static defaultProps = {
    tabs: {}
  };
  render() {
    const { tabs } = this.props;
    console.log("Test");
    console.log(tabs);
    return (
      <Tabs>
        {tabs.map(item => (
          <TabPane tab={item.title} key={item.key}>
            <Content />
          </TabPane>
        ))}
      </Tabs>
    );
  }
}
