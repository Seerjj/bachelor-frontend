import { User, UserField } from "../definitions/types";
import { getProp } from "./general_funcs";


export function getUserPropAsString(user: User | undefined, field: UserField) {
    const value = getProp(user, field);
    if (value === 0) {
      return 0 + "";
    }
    return (value || "") + "";
  }
  