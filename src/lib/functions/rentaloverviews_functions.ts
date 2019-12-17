import { RentalOverview, RentalOverviewField } from "../definitions/types";
import { getProp } from "./general_funcs";


export function getRentalOverviewPropAsString(rental: RentalOverview | undefined, field: RentalOverviewField) {
    const value = getProp(rental, field);
    if (value === 0) {
      return 0 + "";
    }
    return (value || "") + "";
  }
  