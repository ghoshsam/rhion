import { Component } from "react";
import { func, string } from "prop-types";

export default class Container extends Component {
  static propType = {
    id: string.isRequired,
    render: func.isRequired
  };

  render() {
    return this.props.render();
  }
}
