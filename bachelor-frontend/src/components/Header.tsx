import React from 'react'
import Logo from "./images/LogoRemastered.png";
import { Header, Icon, Image } from 'semantic-ui-react'

const HeaderComponent = () => (
  <div>

    <Header as='h2' icon textAlign='center'>

        <Image src={Logo} style={{
            flex: 1,
            alignSelf: 'stretch',
            width: "263px",
            height: "55px"
        }}/>

                {/* CHANGE THIS NAME */}
    <Header.Content>Administrator</Header.Content>
    
    </Header>

  </div>
)

export default HeaderComponent