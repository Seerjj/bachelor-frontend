export enum Path {
  RentalOverview = "/rentaloverview",
  Houses = "/houses",
  Customers = "/customers",
  Materials = "/materials",
  Production = "/production",
  Login = "/login",
  QR = "/qr-reader"
}
export const NameToPath = {
  RentalOverview: "/rentaloverview",
  Houses: "/houses",
  Customers: "/customers",
  Materials: "/materials",
  Production: "/production",
  QR: "/qr-reader"
};

export const pathToName = {
  "/rentaloverview": "RentalOverview",
  "/houses": "Houses",
  "/customers": "Customers",
  "/materials": "Materials",
  "/production": "Production",
  "/qr-reader" : "QR"
};

export enum MenuItemName {
  RentalOverview = "RentalOverview",
  Houses = "Houses",
  Customers = "Customers",
  Materials = "Materials",
  Production = "Production",
  QR = "QR",
  None = "none"
}

export enum FMURL {
  //     RentalOverview = "http://",
  //     Houses = "http://",
  Customers = "http://localhost:54263/api/v1/customers",
  Login = "login"
  //     Materials = "http://",
  //     Production = "http://"
}

export enum ErrorSeverity {
  Low = "Low severity error",
  Medium = "Medium severity error",
  High = "High severity error"
}


export enum SortState {
  Ascending = "ascending",
  Descending = "descending",
  Off = "off"
}

export enum TypeOfError {
  NetworkError = "network error",
  CodeExecutionError = "code execution error"
}
