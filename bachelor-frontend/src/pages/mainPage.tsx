import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { Path } from "../lib/definitions/enums";
import { Switch, Route } from "react-router";
import Houses from "../pages/Houses";
import Production from "../pages/Production";
import Materials from "../pages/Materials";
import "../css/main.css";
import RentalOverview from "../pages/RentalOverview";
import { Customers } from "../pages/Customers";
import { Login } from "./Login";

export const MainPage: React.FC = () => {
  return (
    <div className="main-container">
      <div className="main-container__content">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route
            path={Path.RentalOverview}
            component={RentalOverview}
          />
          <Route path={Path.Houses} component={Houses} />
          <Route path={Path.Customers} component={Customers} />
          <Route path={Path.Materials} component={Materials} />
          <Route path={Path.Production} component={Production} />
        </Switch>
      </div>
    </div>
  );
};
