import { MenuItemName, Path, ErrorSeverity } from "../definitions/enums";
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
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  onOK: (json: any) => void,
  onNotOK: (json: ApiMessage) => void,
  onNetworkError: (error: typeof Error) => void,
  body?: string,
  finallyCallback?: () => void,
  signal?: AbortSignal
) {
  try {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    // headers.set("iToken", localStorage.getItem("iToken") + "");
    const response = await fetch(url, {
      headers: headers,
      method: method,
      signal: signal,
      body: body ? body : undefined
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
    onNetworkError(error);
  } finally {
    if (finallyCallback) {
      finallyCallback();
    }
  }
}
export function logError(message: string, severity: ErrorSeverity) {
  console.log(severity + ": " + message);
}

export function setProp(obj: any, path: string, value: any) {
  const keyPath = path.split(".");
  let lastKeyIndex = keyPath.length - 1;
  for (var i = 0; i < lastKeyIndex; ++i) {
    let key = keyPath[i];
    if (!(key in obj)) {
      obj[key] = {};
    }
    obj = obj[key];
  }
  obj[keyPath[lastKeyIndex]] = value;
}

export function getProp(object: any, property: string) {
  if (!object) {
    return undefined;
  }

  const properties = property.split(".");
  let currentObject = object;
  let index = 0;
  let currentProperty = properties[index];

  while (currentObject.hasOwnProperty(currentProperty)) {
    if (index === properties.length - 1) {
      return currentObject[currentProperty];
    } else {
      currentObject = currentObject[currentProperty];
      if (currentObject === undefined) {
        return undefined;
      }
      index++;
      currentProperty = properties[index];
    }
  }

  return undefined;
}
