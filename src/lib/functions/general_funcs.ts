import {
  // MenuItemName,
  Path,
  ErrorSeverity,
  TypeOfError
} from "../definitions/enums";
import { RestMethod, ApiMessage } from "../definitions/types";

// export function pathFromName(name: MenuItemName) {
//   switch (name) {
//     case MenuItemName.RentalOverviews:
//       return Path.RentalOverviews;
//     case MenuItemName.Houses:
//       return Path.Houses;
//     case MenuItemName.Customers:
//       return Path.Customers;
//     case MenuItemName.Materials:
//       return Path.Materials;
//     case MenuItemName.Production:
//       return Path.Production;
//     default:
//       return "/";
//   }
// }

// export function nameFromPath(path: Path) {
//   switch (path) {
//     case Path.RentalOverviews:
//       return MenuItemName.RentalOverviews;
//     case Path.Houses:
//       return MenuItemName.Houses;
//     case Path.Customers:
//       return MenuItemName.Customers;
//     case Path.Materials:
//       return MenuItemName.Materials;
//     case Path.Production:
//       return MenuItemName.Production;
//     default:
//       return MenuItemName.None;
//   }
// }

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
  onError: (message: string) => void,
  body?: string,
  finallyCallback?: () => void,
  signal?: AbortSignal
) {
  try {
    //create a new header object where we set 
    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    headers.set("Authorization", localStorage.getItem("Authorization") + "");
    const response = await fetch(url, {
      headers: headers,
      method: method,
      signal: signal,
      body: body ? body : undefined
    });

    if (response.ok) {
      try {
        if (response.status != 204) {
          const responseBody = await response.json();
          onOK(responseBody);
        } else {
          onOK(JSON);
        }
      } catch (error) {
        console.log(error);
        onError(
          `A ${TypeOfError.CodeExecutionError} occured. Check the console log for more information`
        );
      }
    } else {
      try {
        const responseBody = await response.json();
        onNotOK(responseBody);
      } catch (error) {
        onError(response.statusText);
      }
    }
    
  } catch (error) {
    console.log(error);
    onError(
      `A ${TypeOfError.NetworkError} occured. Check the console log for more information`
    );
  } finally {
    //provided as argument
    if (finallyCallback) {
      finallyCallback();
    }
  }
}

export async function doFetchNew(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  onOK: (json: any) => void,
  onNotOK: (json: ApiMessage) => void,
  onError: (message: string) => void,
  body?: string,
  finallyCallback?: () => void,
  signal?: AbortSignal
) {
  try {
    const headers = new Headers();
    headers.set("token", localStorage.getItem("token") + "");
    headers.set("refreshToken", localStorage.getItem("refreshToken") + "");
    headers.set("Content-Type", "application/json");
    headers.set("If-None-Match", '""');

    const response = await fetch(
      `https://localhost:44352/api/v1/identity/${url}`,
      {
        headers: headers,
        method: method,
        signal: signal,
        body: body ? body : undefined
      }
    );

    try {
      const responseBody = await response.json();
      if (response.ok) {
        onOK(responseBody);
      } else {
        onNotOK(responseBody);
      }
    } catch (error) {
      console.log(error);
      onError(
        `A ${TypeOfError.CodeExecutionError} occured. Check the console log for more information`
      );
    }
  } catch (error) {
    console.log(error);
    onError(
      `A ${TypeOfError.NetworkError} occured. Check the console log for more information`
    );
  } finally {
    if (finallyCallback) {
      finallyCallback();
    }
  }
}

export function logError(message: string, severity: ErrorSeverity) {
  console.log(severity + ": " + message);
}
//36:45
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
