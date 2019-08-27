import { NAVITEMS_SUCCESS } from "../constants";

export default (state = [], action) => {
  switch (action.type) {
    case NAVITEMS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
