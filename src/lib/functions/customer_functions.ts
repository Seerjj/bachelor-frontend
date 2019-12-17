import { Customer, CustomerField } from "../definitions/types";
import { getProp } from "./general_funcs";

export function getCustomerPropAsString(customer: Customer | undefined, field: CustomerField) {
    const value = getProp(customer, field);
    console.log(value);
    console.log(customer);
    console.log(field)
    if (value === 0) {
      return 0 + "";
    }
  
    return (value || "") + "";
  }
  
  export function getDateElements(dateString: string): [string, string, string] {
    if (dateString.length !== 8) {
      return ["99", "99", "9999"];
    }
    return [dateString.substring(0, 2), dateString.substring(2, 4), dateString.substring(4)];
  }
  