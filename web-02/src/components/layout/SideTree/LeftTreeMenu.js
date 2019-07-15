import React, { Component } from "react";
import { Tree, Input, Menu, Dropdown } from "antd";
import TreeLinkNode from "./TreeLinkNode";
import { withRouter } from "react-router-dom";
const { TreeNode, DirectoryTree } = Tree;
//Left tree

class LeftTreeMenu extends Component {
  constructor(props) {
    super(props);
  }

  onSelect = (selectedKeys, info) => {
    console.log("this.props.url", info.node.props.url);
    this.props.history.push(info.node.props.url);
  };
  state = {
    menus: [
      {
        title: "Home",
        key: "/home",
        url: "/home",
        content: "Content/Component of Tab 1"
      },
      { title: "Form1", key: "/form1", url: "/form1" },
      {
        title: "Form2",
        key: "/form2",
        children: [
          { title: "Form2-1", key: "form2/1", url: "/form2/1" },
          { title: "Form2-1", key: "form2/2", url: "/form2/2" },
          { title: "Form2-1", key: "form2/3", url: "/form2/3" }
        ]
      }
    ]
  };
  renderTreeNodes = treeData =>
    treeData.map(item => {
      if (item.children) {
        return (
          <TreeNode {...item} dataref={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} dataref={item} />;
    });

  render() {
    return (
      <Tree onSelect={this.onSelect}>
        {this.renderTreeNodes(this.state.menus)}
      </Tree>
    );
  }
}

export default withRouter(LeftTreeMenu);
