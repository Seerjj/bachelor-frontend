import React, { useState } from "react";
import "./App.css";
import LoginForm from "./pages/LogInForm";
import Header from "./components/Header";
import { Button } from "semantic-ui-react";
import { MainPage } from "./pages/mainPage";
import { Menubar } from "./components/sideMenu";

const App: React.FC = () => {
  const [sideMenuVisible, setSideMenuVisible] = useState(false);
  const [sideMenuLocked, setSideMenuLocked] = useState(false);
  function setSideMenuVisibleWithGuard(isVisible: boolean) {
    if (!sideMenuLocked) {
      setSideMenuVisible(isVisible);
    }
  }
  return (
    <div>
      <Header />
      <div>
        <Menubar
          sideMenuVisible={sideMenuVisible}
          setSideMenuVisible={setSideMenuVisibleWithGuard}
          unlockSideMenu={() => {
            setSideMenuLocked(false);
            setSideMenuVisible(false);
          }}
          searchCallback={(input: string) => alert(input)}
        />
      </div>
      {/* <LoginForm /> */}
      {/* <Button id="button"/> */}
      {/* <SideMenu/> */}
      <div>
      <MainPage />
      </div>
    </div>
  );
};

export default App;
