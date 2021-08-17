import { combineReducers } from "redux";
import PasswordGeneraterReducer from "./PasswordGeneraterReducer/reducer";
import APIResponseReducer from "./APIResponseReducer/reducer";
import { connectRouter } from "connected-react-router";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    PasswordGeneraterDetails: PasswordGeneraterReducer,
    APIResponseDatils: APIResponseReducer,
  });

export default rootReducer;
