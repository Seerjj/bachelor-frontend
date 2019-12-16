import React from "react";
import Logo from "./images/LogoRemastered.png";
import { Header, Icon, Image, Button } from "semantic-ui-react";
import {AuthConsumer,} from "../pages/AuthContext"

const HeaderComponent = () => (
  <div>
    <Header as="h2" icon textAlign="left">
      <Image
        src={Logo}
        style={{
          flex: 1,
          alignSelf: "stretch",
          width: "263px",
          height: "55px"
        }}
      />
      
    </Header>
  </div>
);

export default HeaderComponent;
