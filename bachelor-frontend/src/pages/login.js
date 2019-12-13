import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";
import { AuthConsumer } from "./AuthContext";
import { Field, Form } from "react-final-form";

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
      <React.Fragment>
        <AuthConsumer>
          {({ login }) => (
            <Form
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
                    name="email"
                    value={this.state.name}
                    type="text"
                    component={Input}
                    placeholder="Email"
                  />
                  <br />
                  <Field
                    name="password"
                    value={this.state.name}
                    type="password"
                    component={Input}
                    placeholder="Password"
                  />
                  <br />

                  <Button style={{ width: 180 }} id="createbtn" type="submit">
                    Login
                  </Button>
                </form>
              )}
            />
          )}
        </AuthConsumer>
      </React.Fragment>
    );
  }
}

export default Login;
