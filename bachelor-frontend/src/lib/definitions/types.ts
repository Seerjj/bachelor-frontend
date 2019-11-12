export type RestMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface RentalOverview {}
export interface Houses {}
export interface Customer {
  customerId: number;
  companyName: string | null;
  companyTown: string | null;
  companyStreet: string | null;
  companyPostalCode: string | null;
  contactNumber: number | null;
  contactPerson: string | null;
}
export interface Materials {}
export interface Production {}
export interface ApiMessage {
  Message: string;
}
