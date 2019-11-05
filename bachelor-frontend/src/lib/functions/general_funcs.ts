import { MenuItemName, Path } from "../definitions/enums";
import { RestMethod, ApiMessage } from "../definitions/types";

export function pathFromName(name: MenuItemName) {
  switch (name) {
    case MenuItemName.RentalOverview:
      return Path.RentalOverview;
    case MenuItemName.Houses:
      return Path.Houses;
    case MenuItemName.Customers:
      return Path.Customers;
    case MenuItemName.Materials:
      return Path.Materials;
    case MenuItemName.Production:
      return Path.Production;
    default:
      return "/";
  }
}

export function nameFromPath(path: Path) {
  switch (path) {
    case Path.RentalOverview:
      return MenuItemName.RentalOverview;
    case Path.Houses:
      return MenuItemName.Houses;
    case Path.Customers:
      return MenuItemName.Customers;
    case Path.Materials:
      return MenuItemName.Materials;
    case Path.Production:
      return MenuItemName.Production;
    default:
      return MenuItemName.None;
  }
}

export function pickRouterProps(props: any) {
  return {
    history: props.history,
    match: props.match,
    location: props.location
  };
}

export async function doFetch(
  method: RestMethod,
  url: string,
  onOK: (json: any) => void,
  onNotOK: (json: ApiMessage) => void,
  onNetworkError: (error: typeof Error, stdMsg: string) => void,
  finallyCallback?: () => void,
  body?: string
) {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json"
        // iToken: localStorage.getItem("iToken")
      } as HeadersInit, // Why do I need to cast randomly here?
      method,
      body: body
    });

    try {
      const responseBody = await response.json();
      if (response.ok) {
        onOK(responseBody);
      } else {
        onNotOK(responseBody);
      }
    } catch (error) {
      if (response.ok) {
        onOK({ Message: "Success" });
      } else {
        onNotOK({ Message: "Error" });
      }
    }
  } catch (error) {
    console.log(error, typeof error);
    onNetworkError(error, "Network error");
  } finally {
    if (finallyCallback) {
      finallyCallback();
    }
  }
}
