import React, { Component } from "react";

class RoomListItem extends Component {
  render() {
    const { room } = this.props;
    return (
      <div className="RoomListItem">
        <li className="item">
          <div>
            <img alt={room.title} />
            <div className="saveBtn"></div>
          </div>
          <div className="ratesInfo">
            <img alt="rates" />
            <div className="rate">{room.rate}</div>
            <div className="commentCount">({room.commentCount})</div>
          </div>
          <div className="propertyInfo">
            <div className="propertyType">{room.propertyType}</div>
            <div className="location">{room.location}</div>
          </div>
          <div className="title">{room.title}</div>
          <div className="pricePerDay">
            <div className="price">{room.pricePerDay}</div>
            <div>/ 1박</div>
          </div>
          <div className="totalPrice">
            총 요금: ₩
            {(room.pricePerDay +
              room.serviceFee +
              room.pricePerson * room.aduls) *
              room.nights}
          </div>
        </li>
      </div>
    );
  }
}

export default RoomListItem;
