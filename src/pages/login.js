import React, { Component } from "react";
import { Button, Input, Icon, Grid, Image, Header, Segment } from "semantic-ui-react";
import { AuthConsumer } from "./AuthContext";
import { Field, Form } from "react-final-form";
import Logo from "../components/images/logo.png"

class Login extends Component {
  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
    
    this.state = {
      users: [],
      email: "",
      password: ""
    };
  }
  routeChange() {
    let path = "/customers";
    this.props.history.push(path);
  }

  render() {
    return (
      <div className="login">
      <React.Fragment>
        <AuthConsumer>
          {({ login, isAuth }) => (
            <div>
            {!isAuth ? (
            <Form
              size="large"
              textAlign="center"
              onSubmit={values => {
                //console.log(values);

                login({
                  email: values.email,
                  password: values.password,
                  onLogin: this.routeChange
                });
              }}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Field
                    icon="user"
                    iconPosition="left"
                    name="email"
                    value={this.state.name}
                    type="text"
                    component={Input}
                    placeholder="Email"
                  />
                  <br />
                  <Field
                    icon="lock"
                    iconPosition="left"
                    name="password"
                    value={this.state.name}
                    type="password"
                    component={Input}
                    placeholder="Password"
                  />
                  <br />

                  <Button style={{ width: 207 }} id="createbtn" type="submit" color="green" fluid size="large" >
                    Login
                  </Button>
                </form>
              )}
            />) : (
              <div />
            )}
            </div>
          )}
        </AuthConsumer>
        <AuthConsumer>
          {({ isAuth, user, login, logout }) => (
            <div>
              {isAuth ? (
                <div className="newLogoutButton">
                  <Icon
                    size="large"
                    name="sign-out alternate"
                    style={{position: "absolute",
                      top: "8px",
                      right: "8px"}}
                    onClick={logout}
                  />
                </div>
              ) : (
                <div />
              )}
            </div>
          )}
        </AuthConsumer>
        
      </React.Fragment>
      </div>
    );
  }
}

export default Login;