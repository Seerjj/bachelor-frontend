import { HouseField, House } from "../definitions/types";
import { getProp } from "./general_funcs";


export function getHousePropAsString(house: House | undefined, field: HouseField) {
    const value = getProp(house, field);
    if (value === 0) {
      return 0 + "";
    }
    return (value || "") + "";
  }
  