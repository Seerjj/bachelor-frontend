import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import { Path } from "../lib/definitions/enums";
import { Switch, Route } from "react-router";
import rentalOverview from "./rentalOverview";

export const MainPage: React.FC = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path={Path.RentalOverview} component={rentalOverview}/>
      
      <Grid>
        <Grid.Row>
          <Grid.Column style={{ backgroundColor: "red" }} width={3}>
            {/* <SideMenu /> */}
          </Grid.Column>
          <Grid.Column style={{ backgroundColor: "aqua" }} width={13}>
            <h1>Second one starts from here</h1>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </Switch>
    </React.Fragment>
  );
};
