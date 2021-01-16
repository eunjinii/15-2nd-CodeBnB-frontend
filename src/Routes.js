import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RoomList from "./Pages/RoomList/RoomList";
import RoomDetail from "./Pages/RoomDetail/RoomDetail";
import Home from "./Pages/Home/Home";
import ReservationHome from "./Pages/Reservation/ReservationHome/ReservationHome";
import ReservationDetail from "./Pages/Reservation/ReservationDetail/ReservationDetail";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/roomlist" component={RoomList} />
          <Route exact path="/roomdetail/:id" component={RoomDetail} />
          <Route exact path="/reservation" component={ReservationHome} />
          <Route exact path="/reservation/detail/:id" component={ReservationDetail} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
