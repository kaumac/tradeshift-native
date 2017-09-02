/**
 * Created by stan229 on 5/27/16.
 */
import { combineReducers } from "redux";
import cars from "./cars/cars.reducer";

export const getReducersWith = extraReducers => {
  console.log(extraReducers);
  return combineReducers({
    ...extraReducers,
    cars
  })
};
