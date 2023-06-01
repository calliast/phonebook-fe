import { combineReducers } from "redux";
import { contactAPI } from "./baseAPI";

const rootReducer = combineReducers({
  [contactAPI.reducerPath]: contactAPI.reducer,
});

export default rootReducer