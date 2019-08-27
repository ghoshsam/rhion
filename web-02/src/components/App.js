import React, { Component, Fragment } from "react";
import { Layout, Menu, Breadcrumb, Tabs, Icon, Button } from "antd";
import ScrollableInkTabBar from "rc-tabs/lib/ScrollableInkTabBar";
import ScrollableTabBar from "rc-tabs/lib/ScrollableTabBar";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { LeftMenu } from "./layout";
import SplitPane from "react-split-pane";
//import TabContainer from "./Tabs";
import { TabCon, TabLayout } from "./Tabs";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import "../theme.less";
const { Header, Content, Footer, Sider } = Layout;

import Tab1 from "./Tabs/Tab1";
import Tab2 from "./Tabs/Tab2";
import { object } from "prop-types";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    const tabPanes = [
      { title: "Tab 1", component: Tab1, key: "0" },
      { title: "Tab 2", component: Tab1, key: "1" },
      { title: "Tab 3", component: Tab1, key: "2" }
    ];
    this.state = {
      activeKey: tabPanes[0].key,
      tabPanes
    };
  }
  render() {
    return (
      <Router>
        <Layout>
          <Header style={{ minHeight: "6vh" }} />
          <Layout style={{ minHeight: "calc(100vh - 14vh)" }}>
            <Sider width={200} theme="light">
              <LeftMenu />
            </Sider>
            {/* <TabCon tabs={this.state.tabPanes} /> */}
            <Tabs>
              <Switch>
                <TabLayout path="/w1" tab="w1" key="w1" component={Tab1} />
                <TabLayout path="/w2" tab="w2" key="w2" component={Tab2} />
              </Switch>
            </Tabs>
          </Layout>
          <Footer />
        </Layout>
      </Router>
    );
  }
}

{
  /*  <Layout className="layout">
      //   <Header />
      //   <Layout>
      //     <Sider width={200}>
      //       <Menu
      //         theme="dark"
      //         mode="vertical-left"
      //         defaultSelectedKeys={["1"]}
      //         style={{ height: "100%" }}
      //       >
      //         <Menu.Item key="1">Nav 1</Menu.Item>
      //         <Menu.Item key="2">Nav 1</Menu.Item>
      //         <Menu.Item key="3">Nav 1</Menu.Item>
      //       </Menu>
      //     </Sider>
      //     <Content style={{ minHeight: "calc(100vh - 10em)" }}>
      //       <Breadcrumb style={{ margin: "16px 0" }}>
      //         <Breadcrumb.Item>Home</Breadcrumb.Item>
      //         <Breadcrumb.Item>List</Breadcrumb.Item>
      //         <Breadcrumb.Item>App</Breadcrumb.Item>
      //       </Breadcrumb>
      //     </Content>
      //   </Layout>
      //   <Footer style={{ textAlign: "center" }}>Footer Text</Footer>
      // </Layout> */
}

{
  /* <Content>
            <Tabs type="editable-card">
              {this.state.tabPanes.map(pane => (
                <TabPane
                  tab={
                    <span>
                      <Icon type="apple" />
                      {pane.title}
                    </span>
                  }
                  key={pane.key}
                  closable={pane.closable}
                >
                  <Content style={{ height: "75vh", overflow: "auto" }}>
                    <Button>Test</Button>
                    <TabRender content={pane.content} />
                  </Content>
                </TabPane>
              ))}
            </Tabs>
          </Content> */
}
