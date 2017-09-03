import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createLogger from 'redux-logger';
import promise from 'redux-promise';

import reducers from "./reducers";

const logger = createLogger();
const initialState = {};

export const getStore = () => createStore(
  reducers,
  initialState,
  applyMiddleware(thunk, logger, promise)
);
