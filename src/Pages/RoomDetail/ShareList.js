import React, { Component } from "react";
import "./ShareList.scss";

class ShareList extends Component {
  render() {
    const { iconImg, iconText } = this.props;
    return (
      <div className="shareModalContainer">
        <div className="shareModalBox">
          <img className="shareIconImg" src={iconImg} alt="shareImg" />
          <div className="shareIconText">{iconText}</div>
        </div>

        {/* <div>
          <ToDoForm onCreate={this.handleCreate} />
          <ToDoList data={toDoList} onUpdate={this.handleUpdate} onRemove={this.handleRemove} />
        </div> */}
      </div>
    );
  }
}

export default ShareList;
