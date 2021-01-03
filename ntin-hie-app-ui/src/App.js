import WaterInput from "./component/WaterInput";
import FoodInput from "./component/FoodInput";
import PeeOutput from "./component/PeeOutput";
import ShitOutput from "./component/ShitOutput";
import History from "./component/History";
import DetailPage from "./component/DetailPage";
import UserWeight from "./component/UserWeight";
import Scan from "./component/Scan";
import Menu from "./component/Menu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/UserWeight:user?/:id?" component={UserWeight} />
        <Route path="/DetailPage:user?/:id?" component={DetailPage} />
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
