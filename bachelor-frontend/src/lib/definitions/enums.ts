export enum Path {
  RentalOverview = "/rentaloverview",
  Houses = "/houses",
  Customers = "/customers",
  Materials = "/materials",
  Production = "/production",
  Login = "/login"
}
export const nameToPath = {
  RentalOverview: "/rentaloverview",
  Houses: "/houses",
  Customers: "/customers",
  Materials: "/materials",
  Production: "/production"
};

export const pathToName = {
  "/rentaloverview": "RentalOverview",
  "/houses": "Houses",
  "/customers": "Customers",
  "/materials": "Materials",
  "/production": "Production"
};

export enum MenuItemName {
  RentalOverview = "RentalOverview",
  Houses = "Houses",
  Customers = "Customers",
  Materials = "Materials",
  Production = "Production",
  None = "none"
}

export enum FMURL {
  //     RentalOverview = "http://",
  //     Houses = "http://",
  // Customers = "https://localhost:44320/api/customers"
  Customers = "http://localhost:51992/api/customers"
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
