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
import  Login  from "./login";
import ProtectedRoute from "./ProtectedRoute";
import QRReader from "../components/QrCodeScanner"

export const MainPage: React.FC = () => {
  return (
    <div className="main-container">
      {/* <div className="main-container__content"> */}
        <Switch>
          <Route exact path="/" component={Login} />
          <ProtectedRoute
            path={Path.RentalOverview}
            component={RentalOverview}
          />
          <ProtectedRoute path={Path.Houses} component={Houses} />
          <ProtectedRoute path={Path.Customers} component={Customers} />
          <ProtectedRoute path={Path.Materials} component={Materials} />
          <ProtectedRoute path={Path.Production} component={Production} />
          <ProtectedRoute path={Path.QR} component={QRReader} />
        </Switch>
      {/* </div> */}
    </div>
  );
};
