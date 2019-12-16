import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { MainPage } from "./pages/mainPage";
import { Menubar } from "./components/sideMenu";

import AddCustomers from "../src/components/AddCustomers";
import AddMaterials from "../src/components/AddMaterials";
import AddHouses from "../src/components/AddHouses";
import { Route } from "react-router";
import { AuthProvider } from "./pages/AuthContext";

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
      <AuthProvider>
        {" "}
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
      </AuthProvider>
    </div>
  );
};

export default App;
