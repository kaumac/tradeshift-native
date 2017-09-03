import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createLogger from 'redux-logger';
import promise from 'redux-promise';

import reducers from "./reducers";

const logger = createLogger();
const initialState = {};

export const getStore = () => Reactotron.createStore(
  reducers,
  initialState,
  applyMiddleware(thunk, logger, promise)
);

Reactotron
  .configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux())
  .connect() // let's connect!
