import { Customer, CustomerField } from "../definitions/types";
import { getProp } from "./general_funcs";


export function getCustomerPropAsString(customer: Customer | undefined, field: CustomerField) {
    const value = getProp(customer, field);
    if (value === 0) {
      return 0 + "";
    }
    return (value || "") + "";
  }
  