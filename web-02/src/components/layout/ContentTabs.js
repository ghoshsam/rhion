import React, { Component } from "react";
import { string } from "prop-types";
import { Tabs } from "antd";
const { TabPane } = Tabs;
export default class PageContainer extends Component {
  static propTypes = {
    title: string.isRequired,
    key: string.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return <Tabs />;
  }
}
