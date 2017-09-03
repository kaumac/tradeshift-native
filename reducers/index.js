import { combineReducers } from "redux";
import navigation from "./navigation/navigation.reducer";
import cars from "./cars/cars.reducer";

export default combineReducers({
  navigation,
  cars
})
