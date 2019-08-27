import {
  NAVITEMS_REQUESTING,
  NAVITEMS_SUCCESS,
  NAVITEMS_FAILURE
} from "../constants";

const navLoading = () => ({ type: NAVITEMS_REQUESTING });
const navLoaded = items => ({ type: NAVITEMS_SUCCESS, payload: items });
const navLoadError = () => ({ type: NAVITEMS_FAILURE });

export const requestNav = () => (dispatch, getState, api) => {
  dispatch(navLoading());
  return api
    .fetchNevItems()
    .then(items => {
      dispatch(navLoaded(items));
      return items;
    })
    .catch(err => {
      dispatch(navLoadError());
    });
};
