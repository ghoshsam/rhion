import React, { Component } from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;
class TabView extends Component {
  componentDidMount() {}
  render() {
    return (
      <Tabs>
        {this.props.openTabs.map(item => (
          <TabPane tab={item.title} key={item.key}>
            <Content>{item.title}</Content>
          </TabPane>
        ))}
      </Tabs>
    );
  }
}

const mapStateToProps = state => {
  return (openTabs = state.openTabs);
};
