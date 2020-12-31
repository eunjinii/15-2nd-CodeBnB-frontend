import React, { Component } from "react";
import "./Review.scss";

class Review extends Component {
  render() {
    const { checkList, scoreValue, score } = this.props;
    return (
      <div>
        <div className="checkListBox">
          <div className="checkListText">
            <div className="checkListName">{checkList}</div>
          </div>
          <div className="checkListScoreBox">
            <div className="checkListScoreLine">
              <progress value={scoreValue} max="100"></progress>
            </div>
            <div className="checkListScore">{score}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Review;
