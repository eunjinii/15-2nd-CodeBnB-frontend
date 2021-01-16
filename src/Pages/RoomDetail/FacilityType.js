import React, { Component } from "react";
import "./FacilityType.scss";

class FacilityType extends Component {
  render() {
    const { facilities } = this.props;

    return (
      <div className="FacilityType">
        <div className="facilityTypeContainer">
          <div className="facilityTypeTitle">{facilities.category}</div>
          <ul className="facilityTypeListBox">
            {facilities.facility_list.map(facility => {
              return <li className="facilityTypeList">{facility}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default FacilityType;
