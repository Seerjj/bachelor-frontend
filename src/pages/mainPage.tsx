import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { Path } from "../lib/definitions/enums";
import { Switch, Route } from "react-router";
import { Houses } from "../pages/Houses";
import { RentalOverviews } from "../pages/RentalOverviews";
import { ProductionInformations } from "../pages/Production";
import { Materials } from "../pages/Materials";
import "../css/main.css";
import { Customers } from "../pages/Customers";
import Login from "./login";
import ProtectedRoute from "./ProtectedRoute";
import QRReader from "../components/QrCodeScanner";
import { Users } from "./Users";

export const MainPage: React.FC = () => {
  return (
    <div className="main-container">
      <Switch>
        <Route exact path="/" component={Login} />
        <ProtectedRoute
          path={Path.RentalOverviews}
          component={RentalOverviews}
        />
        <ProtectedRoute path={Path.Users} component={Users}/>
        <ProtectedRoute path={Path.QR} component={QRReader} />
        <ProtectedRoute path={Path.Houses} component={Houses} />
        <ProtectedRoute path={Path.Customers} component={Customers} />
        <ProtectedRoute path={Path.Materials} component={Materials} />
        <ProtectedRoute
          path={Path.Production}
          component={ProductionInformations}
        />
      </Switch>
      </div>
  );
};
