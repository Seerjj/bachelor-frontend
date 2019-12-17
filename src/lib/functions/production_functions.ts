import { ProductionField, Production } from "../definitions/types";
import { getProp } from "./general_funcs";


export function getProductionInfoPropAsString(productionInformation: Production | undefined, field: ProductionField) {
    const value = getProp(productionInformation, field);
    if (value === 0) {
      return 0 + "";
    }
    return (value || "") + "";
  }
  