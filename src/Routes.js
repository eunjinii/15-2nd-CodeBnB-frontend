import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import RoomList from "./Pages/RoomList/RoomList";
import RoomDetail from "./Pages/RoomDetail/RoomDetail";
import ReservationWing from "./Components/ReservationWing/ReservationWing";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/roomlist" component={RoomList} />
          <Route exact path="/roomdetail" component={RoomDetail} />
          <Route exact path="/rw" component={ReservationWing} /> {/* 임시로 붙여놓은 주소 삭제예정 */}
        </Switch>
      </Router>
    );
  }
}

export default Routes;
