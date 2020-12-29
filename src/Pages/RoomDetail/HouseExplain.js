import React, { Component } from "react";
import "./HouseExplain.scss";

class HouseExplain extends Component {
  render() {
    const { iconImg, explainTitle, explainContent } = this.props;
    return (
      <div className="HouseExplain">
        <div className="explainContainer">
          <div className="explainBox">
            <div className="house">
              <img className="explainIcon" src={iconImg} alt="userImg" />
            </div>
            <div className="ExplainText">
              <div className="explainTitle">{explainTitle}</div>
              <div className="explainSubheading">{explainContent}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HouseExplain;
