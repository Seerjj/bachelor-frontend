import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { MainPage } from "./pages/mainPage";
import { Menubar } from "./components/sideMenu";

import AddCustomers from "../src/components/AddCustomers";
import AddMaterials from "../src/components/AddMaterials";
import AddHouses from "../src/components/AddHouses";
import Login from "./pages/LogInForm";
import { Route } from "react-router";

const App: React.FC = () => {
  const [sideMenuVisible, setSideMenuVisible] = useState(false);
  const [sideMenuLocked, setSideMenuLocked] = useState(false);
  const isLoggedIn = false;
  function setSideMenuVisibleWithGuard(isVisible: boolean) {
    if (!sideMenuLocked) {
      setSideMenuVisible(isVisible);
    }
  }

  return (
    <div>
      {isLoggedIn ? (
        <Login />
      ) : (
        <div>
          <Header />
            <Menubar
              sideMenuVisible={sideMenuVisible}
              setSideMenuVisible={setSideMenuVisibleWithGuard}
              unlockSideMenu={() => {
                setSideMenuLocked(false);
                setSideMenuVisible(false);
              }}
              searchCallback={(input: string) => alert(input)}
            />
            <MainPage />
          </div>
          )}
    </div>
  );
};

export default App;
