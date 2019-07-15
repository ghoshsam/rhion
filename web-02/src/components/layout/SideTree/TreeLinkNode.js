import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";

class TreeLinkNode extends React.PureComponent {
  onCheck = () => {
    this.props.history.push(this.props.url);
  };

  render() {
    return <TreeNode {...this.props} onCheck={this.onCheck} />;
  }
}
export default withRouter(TreeLinkNode);
