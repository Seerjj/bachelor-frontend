export type RestMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface RentalOverview {
  id: number;
  productionInformation: string | null;
  purchaseStatus: string | null;
  setupAddressTown: string | null;
  setupAddressStreet: string | null;
  setupAddressPostalCode: string | null;
  estimatedPrice: string | null;
}

export type RentalOverviewField =
  | "id"
  | "productionInformation"
  | "purchaseStatus"
  | "purchaseStatusText"
  | "setupAddressTown"
  | "setupAddressStreet"
  | "setupAddressPostalCode"
  | "estimatedPrice";

export interface House {
  id: number;
  houseType: string | null;
  squareMeters: number | null;
}

export type HouseField = "id" | "houseType" | "squareMeters"


;

export interface HouseType{
  id: number;
  houseType: string | null;
  materialsOnHouse: string | null;
}

export interface User {
  id: string;
  userName: string;
  email: string;
  roles: [string];
}

export type UserField = "id" | "userName" | "email" | "roles";

export interface Customer {
  id: number;
  companyName: string | null;
  companyTown: string | null;
  companyStreet: string | null;
  companyPostalCode: string | null;
  contactNumber: string | null;
  contactPerson: string | null;
}

export type CustomerField =
  | "id"
  | "companyName"
  | "companyTown"
  | "companyStreet"
  | "companyPostalCode"
  | "contactNumber"
  | "contactPerson";

export interface Material {
  id: number;
  houseSection: string | null;
  category: string | null;
  name: string | null;
  supplier: string | null;
  units: string | null;
  pricePerUnit: string | null;
}

export type MaterialField =
  | "id"
  | "houseSection"
  | "category"
  | "name"
  | "supplier"
  | "units"
  | "pricePerUnit";

export interface Production {
  id: number;
  houseId: number;
  rents: string;
  customer: {
    companyName: string;
    companyTown: string;
    companyStreet: string;
    companyPostalCode: string;
    contactNumber: string;
    contactPerson: string;
    id: number;
  };
  exteriorWalls: string;
  ventilation: string;
  note: string;
  productionPrice: string;
  productionDate: string;
  additionalCosts: string;
  lastUpdatedBy: string;
  lastUpdatedDate: string;
  isActive: string;
}

export type ProductionField =
  | "id"
  | "houseId"
  | "rents"
  | "customer"
  |"customer.id"
|"customer.companyName"
|"customer.companyTown"
|"customer.companyStreet"
|"customer.companyPostalCode"
|"customer.contactNumber"
|"customer.contactPerson"

  
  | "exteriorWalls"
  | "ventilation"
  | "note"
  | "productionPrice"
  | "productionDate"
  | "additionalCosts"
  | "lastUpdatedBy"
  | "lastUpdatedDate"
  | "isActive";

export interface ApiMessage {
  Message: string;
}
