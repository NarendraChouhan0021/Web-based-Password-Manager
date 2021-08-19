import { combineReducers } from "redux";
import WpmReducer from "./Wpm/reducer";
import APIResponseReducer from "./ApiResponse/reducer";
import { connectRouter } from "connected-react-router";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    wpm: WpmReducer,
    APIStatus: APIResponseReducer,
  });

export default rootReducer;
