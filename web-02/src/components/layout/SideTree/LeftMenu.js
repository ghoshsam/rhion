import React, { Component } from "react";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import MenuItem from "antd/lib/menu/MenuItem";
import { withRouter, Link, NavLink } from "react-router-dom";
import { requestNav } from "../../../actions/navitems";
import { connect } from "react-redux";
import Item from "antd/lib/list/Item";

class LeftMenu extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.requestNav();
  }
  render() {
    return (
      <Menu mode="inline">
        {this.props.items.map(item => {
          if (item.children.length > 0)
            return (
              <SubMenu title={<span>{item.label}</span>}>
                {item.children &&
                  item.children.map(ch => (
                    <Menu.Item key={ch.key}>
                      <NavLink to={ch.key}>{ch.label}</NavLink>
                    </Menu.Item>
                  ))}
              </SubMenu>
            );
          else
            return (
              <Menu.Item key={item.key}>
                <NavLink to={item.key}> {item.label}</NavLink>
              </Menu.Item>
            );
        })}
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return { items: state.navitems };
};

const mapDispatchToProps = {
  requestNav
};

// const mapDispatchToProps = dispatch => ({
//   fetchNav: () => dispatch(requestNav)
// });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftMenu);
