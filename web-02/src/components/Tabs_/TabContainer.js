import React, { Component, Fragment } from "react";
import { Tabs, Layout } from "antd";
const { Content } = Layout;
const { TabPane } = Tabs;
import Tab1 from "./Tab1";

export default class TabContainer extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  static tabPanes = [
    { title: "Tab 1", content: Tab1, key: "0" },
    { title: "Tab 2", content: Tab1, key: "1" },
    { title: "Tab 3", content: Tab1, key: "2" }
  ];
  renderContent = content => {
    console.log(content);
    if (content instanceof Component) {
      const TabComponent = content;
      return <TabComponent />;
    }
    return content;
  };

  render() {
    return;
    // <Tabs>
    //   {this.tabPanes.map(pane => (
    //     <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
    //       {/* <Content>{this.renderContent(pane.content)}</Content> */}
    //     </TabPane>
    //   ))}
    // </Tabs>
  }
}
