import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import RoomList from "./Pages/RoomList/RoomList";
import RoomDetail from "./Pages/RoomDetail/RoomDetail";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/roomlist" component={RoomList} />
          <Route exact path="/roomdetail" component={RoomDetail} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
