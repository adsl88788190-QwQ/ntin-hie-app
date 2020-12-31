import "./App.css";
import React, { Fragment, useState } from "react";
import WaterInput from "./component/WaterInput";
import FoodInput from "./component/FoodInput";
import PeeOutput from "./component/PeeOutput";
import ShitOutput from "./component/ShitOutput";
import History from "./component/History";
import Scan from "./component/Scan";
import Menu from "./component/Menu";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/History:user?/:id?" component={History} />
        <Route path="/ShitOutput:user?/:id?" component={ShitOutput} />
        <Route path="/PeeOutput:user?/:id?" component={PeeOutput} />
        <Route path="/FoodInput:user?/:id?" component={FoodInput} />
        <Route path="/WaterInput:user?/:id?" component={WaterInput} />
        <Route path="/Menu:user?/:id?" component={Menu} />
        <Route path="/" component={Scan} />
      </Switch>
    </Router>
  );
}

export default App;
