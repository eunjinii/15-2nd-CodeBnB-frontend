import React, { Component } from "react";
import "./UserReview.scss";

class UserReview extends Component {
  render() {
    const { userImg, userName, userDate, userComments } = this.props;
    return (
      <div className="UserReview">
        <div className="gridItem">
          <div className="reviewContainer">
            <div className="userReviewBox">
              <img className="userImg" src={userImg} alt="userImg" />
            </div>
            <div className="userReviewText">
              <div className="userName">{userName}</div>
              <div className="userDate">{userDate}</div>
            </div>
          </div>
          <div className="userComments">{userComments}</div>
        </div>
      </div>
    );
  }
}

export default UserReview;
