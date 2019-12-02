import React from "react";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import Logo from "../components/images/logo.png";

const Login: React.FC = () => {

  return(
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: "50vh" }}>
        <Image src={Logo} verticalAlign="middle" />
        <Header as="h2" textAlign="center">
          <p className="Text-Fill">Log in to your account</p>
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              icon="user"
              iconPosition="left"
              placeholder="Username"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />
            <Button color="green" fluid size="large">
              Log in
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Login;