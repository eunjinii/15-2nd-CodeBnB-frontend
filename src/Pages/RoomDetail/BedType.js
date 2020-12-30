import React, { Component } from "react";
import "./BedType.scss";

class BedType extends Component {
  render() {
    const { bedAmount, cardTextTitle, cardTextContents } = this.props;
    return (
      <>
        <div className="cards">
          <div className="card">
            <div className="cardSuburb">
              <div className="cardIcon">
                <div className="cardIconItem">
                  <img className="cardIconItemImg" src={bedAmount} alt="userImg" />
                </div>
              </div>
              <div className="cardText">
                <div className="cardTextTitle">{cardTextTitle}</div>
                <div className="cardTextContents">{cardTextContents}</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default BedType;
