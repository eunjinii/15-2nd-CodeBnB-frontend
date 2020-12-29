import React, { Component } from "react";
import "./Important.scss";

class Important extends Component {
  render() {
    const { rule } = this.props;
    return (
      <div className="importantBoxItem">
        <div className="roomRule">{rule && rule.category}</div>
        <div className="roomRuleBox">{rule && rule.rule_list} </div>
      </div>
    );
  }
}

export default Important;
