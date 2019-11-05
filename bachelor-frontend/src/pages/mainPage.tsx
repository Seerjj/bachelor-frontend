import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { Path } from "../lib/definitions/enums";
import { Switch, Route } from "react-router";
import RentalOverview from "../pages/RentalOverview";
import Houses from "../pages/Houses";
import Customers from "../pages/Customers";
import Production from "../pages/Production";
import Materials from "../pages/Materials";
import "../css/main.css"
import Login from "./LogInForm";
export const MainPage: React.FC = () => {
  return (
    <div className="main-container">
      <div className="main-container__content">
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route exact path={Path.RentalOverview} component={RentalOverview} />
        <Route exact path={Path.Houses} component={Houses} />
        <Route exact path={Path.Customers} component={Customers} />
        <Route exact path={Path.Materials} component={Materials} />
        <Route exact path={Path.Production} component={Production} />
      </Switch>
    </div>
    </div>
  );
};
