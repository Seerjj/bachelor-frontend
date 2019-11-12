export type RestMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface RentalOverview{

}
export interface Houses{
    
}
export interface Customers{
  customerId: number;
	companyName: string;
	companyTown: string;
	companyStreet: string;
	companyPostalCode: number;
	contactNumber: number;
	contactPerson: string;
}
export interface Materials{
    
}
export interface Production{
    
}
export interface ApiMessage {
    Message: string;
  }
  