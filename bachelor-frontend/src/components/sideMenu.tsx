import React from "react";
import { Menu } from "semantic-ui-react";
import { MenuItemName, Path } from "../lib/definitions/enums";
import { nameFromPath, pathFromName } from "../lib/functions/general_funcs";
import { RouteComponentProps, withRouter } from "react-router";

export interface MenubarProps extends RouteComponentProps {
  sideMenuVisible: boolean;
  setSideMenuVisible(setVisible: boolean): void;
  unlockSideMenu(): void;
  searchCallback(input: string): void;
}

const UnroutedMenubar: React.FC<MenubarProps> = props => {
  function handleOnMenuItemClick(item: MenuItemName) {
    props.history.push(pathFromName(item));
    props.setSideMenuVisible(false);
  }


  function shouldBeHighlighted(item: MenuItemName) {
    const currentPath = props.history.location.pathname;
    if (Object.values(Path).includes(currentPath as Path)) {
      return item === nameFromPath(currentPath as Path);
    }
    return false;
  }

  const item = (name: MenuItemName) => (
    <Menu.Item
      name={name}
      active={shouldBeHighlighted(name)}
      onClick={() => handleOnMenuItemClick(name)}
    />
  );

  return (
    <React.Fragment>
      <Menu id="sidemenu" inverted vertical>
        {item(MenuItemName.RentalOverview)}
        {item(MenuItemName.Houses)}
        {item(MenuItemName.Customers)}
        {item(MenuItemName.Materials)}
        {item(MenuItemName.Production)}
      </Menu>
    </React.Fragment>
  );
};

export const Menubar = withRouter(UnroutedMenubar);
