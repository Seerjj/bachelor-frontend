import React from "react";
import Logo from "./images/logo.png";
import { Header, Icon, Image } from "semantic-ui-react";

const HeaderComponent = () => (
  <div>
    <Header as="h2" icon textAlign="left">
      <Image
        src={Logo}
        style={{
          flex: 1,
          alignSelf: "stretch",
          width: "10em",
          height: "5em"
        }}
      />
      
    </Header>
  </div>
);

export default HeaderComponent;
