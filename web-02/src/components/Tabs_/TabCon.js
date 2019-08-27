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
  renderContent = content => {
    console.log(content);
    if (content instanceof Component) {
      const TabComponent = content;
      return <TabComponent />;
    }
    return content;
  };
  render() {
    const { tabs } = this.props;
    return (
      <Tabs>
        {tabs.map(item => (
          <TabPane tab={item.title} key={item.key}>
            <item.component />
            {/* <Content>{this.renderContent(item.content)}</Content> */}
          </TabPane>
        ))}
      </Tabs>
    );
  }
}
