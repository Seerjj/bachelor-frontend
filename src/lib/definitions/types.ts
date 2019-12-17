export type RestMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface RentalOverviews{
  id: number;
  productionInformation: string | null;
  purchaseStatus: string | null;
  setupAddressTown: string | null;
  setupAddressStreet: string | null;
  setupAddressPostalCode: string | null;
  estimatedPrice: string | null;
}
export interface Houses {
  id: number;
  houseType: string | null;
  squareMeters: number | null;
}

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
|"id"
|"companyName"
|"companyTown"
|"companyStreet"
|"companyPostalCode"
|"contactNumber"
|"contactPerson"


export interface Materials {
  id: number;
  houseSection: string | null;
  category: string | null;
  name: string | null;
  supplier: string | null;
  units: string | null;
  pricePerUnit: string | null;
}
export interface Production {
  id: number;
  house: string | null;
  houseId: number; //???? in sync with houses?
  customer: string | null; //??? in sync with actual customers?
  exteriorWalls: string | null;
  ventilation: string | null;
  note: string | null;
  productionPrice: string | null;
  productionDate: string | null;
  additionalCosts: string | null;
  lastUpdatedBy: string | null;
  lastUpdatedDate: string | null;
}
export interface ApiMessage {
  Message: string;
}
