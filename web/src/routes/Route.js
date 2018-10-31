import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "../components/App";
import Login from "../components/Login";
import Signup from "../components/Signup";

const Routes = () => (
   <Router>
      <Switch>
         <Route exact path="/" component={App} />
         <Route exact path="/login" component={Login} />
         <Route exact path="/signup" component={Signup} />
      </Switch>
   </Router>
);

export default Routes;
