import React, { Component } from "react";
import "./Important.scss";

class Important extends Component {
  render() {
    const { rule } = this.props;
    const ruleSet = new Set(rule.rule_list);

    return (
      <div className="importantBoxItem">
        <div className="roomRule">{rule && rule.category}</div>
        <ul className="roomRuleBox">
          {rule &&
            [...ruleSet].map((item, index) => {
              return (
                <li key={index} className="ruleItem">
                  {item}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default Important;
