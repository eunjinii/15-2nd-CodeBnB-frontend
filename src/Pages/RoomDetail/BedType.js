import React, { Component } from "react";
import "./BedType.scss";

class BedType extends Component {
  render() {
    const { room_name, bed_info } = this.props;
    return (
      <div className="BedType">
        <div className="cards">
          <div className="card">
            <div className="cardSuburb">
              <div className="cardIcon">
                <div className="cardIconItem">
                  {[...Array(bed_info[0]?.count)].map((n, index) => {
                    return (
                      <img className="cardIconItemImg" src="/images/RoomDetail/noun_Bed_3667468.png" alt="userImg" />
                    );
                  })}
                </div>
              </div>
              <div className="cardText">
                <div className="cardTextTitle">{room_name}</div>
                <div className="cardTextContents">
                  {bed_info[0]?.bed_name}&nbsp;{bed_info[0]?.count}개
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BedType;
