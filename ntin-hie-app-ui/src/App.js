import "./App.css";
import React, { Fragment, useState } from "react";
import UserInput from "./component/UserInput";
import Scan from "./component/Scan";
import Menu from "./component/Menu";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/UserInput:user?/:id?" component={UserInput} />
        <Route path="/Menu:user?/:id?" component={Menu} />
        <Route path="/" component={Scan} />
      </Switch>
    </Router>
  );
}

export default App;
