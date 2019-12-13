import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { Path } from "../lib/definitions/enums";
import { Switch, Route } from "react-router";
import {House} from "../pages/Houses";
import {ProductionInformation} from "../pages/Production";
import {Material} from "../pages/Materials";
import "../css/main.css";
// import {RentalOverview} from "../pages/RentalOverview";
import { Customers } from "../pages/Customers";
import  Login  from "./login";
import ProtectedRoute from "./ProtectedRoute";
import QRReader from "../components/QrCodeScanner"

export const MainPage: React.FC = () => {
  return (
    <div className="main-container">
      {/* <div className="main-container__content"> */}
        <Switch>
          <Route exact path="/" component={Login} />
          {/* <ProtectedRoute
            path={Path.RentalOverviews}
            component={RentalOverview}
          /> */}
          <ProtectedRoute path={Path.Houses} component={House} />
          <ProtectedRoute path={Path.Customers} component={Customers} />
          <ProtectedRoute path={Path.Materials} component={Material} />
          <ProtectedRoute path={Path.Production} component={ProductionInformation} />
        </Switch>
      {/* </div> */}
    </div>
  );
};
