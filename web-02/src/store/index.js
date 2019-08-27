import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import api from "../api";

import reducers from "../reducers";

export default createStore(
  reducers,
  applyMiddleware(thunk.withExtraArgument(api))
);
