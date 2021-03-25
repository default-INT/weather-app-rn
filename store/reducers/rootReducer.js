import { combineReducers } from "redux";
import { citiesReducer } from "./citiesReducer";
import { locationReducer } from "./locationReducer";

const rootReducer = combineReducers({
    cities: citiesReducer,
    location: locationReducer
});

export default rootReducer;