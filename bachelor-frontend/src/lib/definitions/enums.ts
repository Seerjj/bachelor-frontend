export enum Path {
  RentalOverviews = "/rentaloverviews",
  Houses = "/houses",
  Customers = "/customers",
  Materials = "/materials",
  Production = "/production",
  Login = "/login"
}
export const NameToPath = {
  RentalOverviews: "/rentaloverviews",
  Houses: "/houses",
  Customers: "/customers",
  Materials: "/materials",
  Production: "/production"
};

export const pathToName = {
  "/rentaloverviews": "RentalOverviews",
  "/houses": "Houses",
  "/customers": "Customers",
  "/materials": "Materials",
  "/production": "Production"
};

export enum MenuItemName {
  RentalOverviews = "RentalOverviews",
  Houses = "Houses",
  Customers = "Customers",
  Materials = "Materials",
  Production = "Production",
  None = "none"
}

export enum FMURL {
  RentalOverviews = "https://localhost:44310/api/v1/rentaloverviews",
  Houses = "https://localhost:44310/api/v1/fmhouses",
  Customers = "https://localhost:44310/api/v1/customers",
  Login = "login",
  Materials = "https://localhost:44310/api/v1/materials",
  Production = "https://localhost:44310/api/v1/productioninformations"
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
