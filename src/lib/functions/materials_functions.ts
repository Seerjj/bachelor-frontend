import { Material, MaterialField } from "../definitions/types";
import { getProp } from "./general_funcs";


export function getMaterialPropAsString(material: Material | undefined, field: MaterialField) {
    const value = getProp(material, field);
    if (value === 0) {
      return 0 + "";
    }
    return (value || "") + "";
  }
  