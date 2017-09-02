import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createLogger from 'redux-logger';
import promise from 'redux-promise';

import { getReducersWith } from "./reducers";

const logger = createLogger();
const initialState = {};

export const getStore = navReducer => createStore(
  getReducersWith({
    navigation: navReducer
  }),
  initialState,
  applyMiddleware(thunk, logger, promise)
);
