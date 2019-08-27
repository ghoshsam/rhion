import { OPENTEABS_LIST } from "../constants";
import { object } from "prop-types";

export default (state = [], action) => {
  switch (action.type) {
    case OPENTEABS_LIST:
      return Object.assign({}, ...state, action.filter);
    default:
      return state;
  }
};
