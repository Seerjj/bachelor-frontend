import React from "react";
import { Menu } from "semantic-ui-react";
import { Path, pathToName, NameToPath } from "../lib/definitions/enums";
import { RouteComponentProps, withRouter } from "react-router";
// import "../scss/_sidemenu.scss"
// import "../scss/main.scss"
import "../App.css";

export interface MenubarProps extends RouteComponentProps {
  sideMenuVisible: boolean;
  setSideMenuVisible(setVisible: boolean): void;
  unlockSideMenu(): void;
  searchCallback(input: string): void;
}

const UnroutedMenubar: React.FC<MenubarProps> = props => {
  function handleOnMenuItemClick(item: keyof typeof NameToPath) {
    const path = NameToPath[item];
    props.history.push(path);
    props.setSideMenuVisible(false);
  }

  function shouldBeHighlighted(item: keyof typeof NameToPath) {
    let currentPath = props.history.location.pathname;
    const elems = currentPath.split("/");
    if (elems.length > 1) {
      currentPath = "/" + elems[1];
    }
    if (Object.keys(pathToName).includes(currentPath)) {
      return item === pathToName[currentPath as keyof typeof pathToName];
    }
    return false;
  }

  const item = (name: keyof typeof NameToPath) => (
    <Menu.Item
      name={name}
      active={shouldBeHighlighted(name)}
      onClick={() => handleOnMenuItemClick(name)}
    />
  );

  return (
    <React.Fragment>
      <Menu>
        {item("RentalOverviews")}
        {item("Houses")}
        {item("Customers")}
        {item("Materials")}
        {item("Production")}
        {item("Users")}
        {item("QR")}
      </Menu>
    </React.Fragment>
  );
};

export const Menubar = withRouter(UnroutedMenubar);
