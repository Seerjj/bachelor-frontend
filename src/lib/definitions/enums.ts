export enum Path {
  RentalOverviews = "/rentaloverviews",
  Houses = "/houses",
  Customers = "/customers",
  Materials = "/materials",
  Production = "/production",
  Login = "/login",
  Users = "/users",
  QR = "/qr-reader"
}
export const NameToPath = {
  RentalOverviews: "/rentaloverviews",
  Houses: "/houses",
  Customers: "/customers",
  Materials: "/materials",
  Production: "/production",
  Users: "/users",
  QR: "/qr-reader"
  
};

export const pathToName = {
  "/rentaloverviews": "RentalOverviews",
  "/houses": "Houses",
  "/customers": "Customers",
  "/materials": "Materials",
  "/production": "Production",
  "/users": "Users",
  "/qr-reader" : "QR"
};

// export enum MenuItemName {
//   RentalOverviews = "RentalOverviews",
//   Houses = "Houses",
//   Customers = "Customers",
//   Materials = "Materials",
//   Production = "Production",
//   QR = "QR",
//   None = "none"
// }

export enum FMURL {
  RentalOverviews = "https://localhost:44310/api/v1/rentaloverviews",
  Houses = "https://localhost:44310/api/v1/fmhouses",
  Customers = "https://localhost:44310/api/v1/customers",
  Login = "https://localhost:44310/api/v1/identity/login",
  Materials = "https://localhost:44310/api/v1/materials",
  Production = "https://localhost:44310/api/v1/productioninformations",
  Users = "https://localhost:44310/api/v1/identity/users"
}

export enum ErrorSeverity {
  Low = "Low severity error",
  Medium = "Medium severity error",
  High = "High severity error"
}

export enum TypeOfError {
  NetworkError = "network error",
  CodeExecutionError = "code execution error"
}

export enum SortState {
  Ascending = "ascending",
  Descending = "descending",
  Off = "off"
}