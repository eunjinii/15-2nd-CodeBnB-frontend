import React, { Component } from "react";
import "./StorageList.scss";

class StorageList extends Component {
  render() {
    return (
      <div className="storageModalContainer">
        <div className="storageModalBox">
          <div className="storageModalItem">
            <input className="storageInput" type="text" placeholder="이름"></input>
          </div>
          <div className="storageModalText">
            <div className="shareInfoText">최대 50자</div>
          </div>
        </div>
      </div>
    );
  }
}

export default StorageList;
