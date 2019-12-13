import React, { Component } from "react";
import { Message } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";

const AuthContext = React.createContext();
// var basicAuth = require("basic-auth");

class AuthProviderComponent extends Component {
  state = {
    isAuth: false,
    user: {},
    token: ""
  };
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.fetch = this.fetch.bind(this);

    this.checkLogin();

    // check if there is a token
    // if there is one, then set isauth to true
    // and the right url will be allowed to go to through the protected route
    // and hope that the token is still valid
    // on each requests if the token is invalid, redirect to the login screen
    // if there is no token, redirect to the login screen
  }

  checkLogin = () => {
    if (this.loggedIn()) {
      this.state = { ...this.state, isAuth: true, token: this.state.token };
      console.log("tstate", this.state);
      //this.props.history.push("/systems");

      // <Redirect push to={"/systems"} />;
    }
  };

  async login(values) {
    var email = values ? values.email : "1";
    var password = values ? values.password : "12345";
    var token = values ? values.token : "12";
    var refreshToken = values ? values.refreshToken : "12";
    console.log(email)
    console.log(password)
    console.log(token)
    console.log(refreshToken)

    if (this.state.isAuth) {
      console.log("bad set up")
      // you shouldn't really end up here, if you end up in here, you've wrongly set up your routes / componetns
    } else {

      try {
        const data = await postData('http://localhost:54263/api/v1/identity/login', { email: email,
        password: password });
        console.log(JSON.stringify(data)); // JSON-string from `response.json()` call
        values.onLogin.call(this);
        this.setToken(data.token);
        console.log("GOT TOKEN BY WINDOW: " + window.sessionStorage.getItem("token"))
        this.setState(
          () => ({
            isAuth: true,
            token: data.token,
            headers: {
              "Content-Type": "application/json",
              token: `Bearer ${data.token}`,

              refreshToken: data.refreshToken
            }
          }),
          () => {
            this.checkLogin();
          }
        );
      } catch (error) {
        console.error(error);
      }
      
      async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          //mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrer: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return await response.json(); // parses JSON response into native JavaScript objects
      }
    //   fetch("http://localhost:54263/api/v1/identity/login", {
    //     method: "post",
    //     headers: {
    //       "Content-Type": "application/json",
    //       token: `Bearer ${token}`,
    //       refreshToken: refreshToken
    //     },
    //     body: JSON.stringify({
    //       email: email,
    //       Password: password
    //     })
    //   })
    //     .then(response => {
    //       if (!response.ok) {
    //         throw Error("Network request failed");
    //       } else {
    //         return response.json();
    //       }
    //     })
    //     .then(response => {
    //       if (values.onLogin) {
    //         values.onLogin.call(this);
    //         this.setToken(response.token);
    //         this.setState(
    //           () => ({
    //             isAuth: true,
    //             token: response.token,
    //             headers: {
    //               "Content-Type": "application/json",
    //               token: `Bearer ${response.token}`,

    //               refreshToken: response.refreshToken
    //             }
    //           }),
    //           () => {
    //             this.checkLogin();
    //           }
    //         );
    //       }
    //       return Promise.resolve(response);
    //     })
    //     .catch(err => console.log(err));
     }
  }
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // GEtting token from localstorage
    //localStorage.removeItem("token")
    return !!token; // handwaiving here
  }

  setToken(idToken) {
    // Saves user token to localStorage
    window.localStorage.setItem("token", idToken);
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("token");
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      token: `Bearer ${this.token}`
    };

    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers["token"] = "Bearer " + this.token;
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json());
  }

  // setting timeout to mimic an async login

  logout() {
    this.setState({ isAuth: false, user: {} });
    sessionStorage.removeItem("token");

  }
  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }
  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          login: this.login,
          logout: this.logout,
          user: this.state.user,
          loggedIn: this.loggedIn,
          fetch: this.fetch,
          token: this.token
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const AuthProvider = withRouter(AuthProviderComponent);

export const AuthConsumer = AuthContext.Consumer;
