import React, { Component } from "react";
import "./FilterPopUp.scss";

const bedroomAndBed = ["침대 수", "침실 수", "욕실 수"];

class FilterPopUp extends Component {
  render() {
    return (
      <div className="FilterPopUp">
        <div className="filterContainer">
          <div className="bedroomAndBed">
            <h4>침실과 침대</h4>
            <ul>
              {bedroomAndBed.map((item, index) => {
                return (
                  <li>
                    <div>{item[index]}</div>
                    <div className="modify">
                      <div className="minus" />0
                      <div className="plus" />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="amenities"></div>
        </div>
      </div>
    );
  }
}

export default FilterPopUp;
