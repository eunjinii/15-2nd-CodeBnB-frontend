import React, { Component } from "react";
import "./Facility.scss";

class Facility extends Component {
  render() {
    const { facility } = this.props;
    return (
      <div className="Facility">
        <div className="facilitiesContainer">
          <div className="facilitiesBox">
            <img className="facilitiesIcon" src={facility.url} alt="facilitiesImg" />
          </div>
          <div className="item">{facility.name} </div>
        </div>
      </div>
    );
  }
}

export default Facility;
