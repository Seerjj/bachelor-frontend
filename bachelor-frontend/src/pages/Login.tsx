import React, { useState, useContext } from "react";
import { RouteComponentProps } from "react-router";
import { doFetchNew } from "../lib/functions/general_funcs";
import { FMURL, NameToPath } from "../lib/definitions/enums";
import { Input, Button, Popup } from "semantic-ui-react";

export const Login: React.FC<RouteComponentProps> = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFetchingToken, setIsFetchingToken] = useState(false);
  const [popupText, setPopupText] = useState("");

  function handleLogin() {
    setIsFetchingToken(true);
    doFetchNew(
      "POST",
      FMURL.Login,
      json => {
        localStorage.setItem("token", json.token);
        localStorage.setItem("refreshToken", json.refreshToken);
        props.history.push(NameToPath["RentalOverview"]);
      },
      
      json => {
        
console.log(json);
        setIsFetchingToken(false);
        if (json.Message) {
          setPopupText(json.Message);
        }
      },
      message => {
        setIsFetchingToken(false);
        setPopupText(message);
      },
      JSON.stringify({
        email: email,
        password: password
      })
      
    );

    setEmail("");
    setPassword("");
  }
  return (
    <div className="login">
      <Input
        label="Email"
        value={email}
        onChange={setEmail}
        small
        alignToEdges
      />
      
      <Input
        label="Password"
        password
        value={password}
        onChange={setPassword}
        small
        alignToEdges
      />
      <Button
        loading={isFetchingToken}
        className="login__button"
        onClick={handleLogin}
    >Fetch</Button>
      <Popup
        content={popupText}
        open={!!popupText}
        onClose={() => setPopupText("")}
      />
    </div>
  );
};
