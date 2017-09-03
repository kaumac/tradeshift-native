import { AppLoading } from "expo";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { Text, ActivityIndicator } from "react-native";

import Navigation from "./Navigation";
import { getStore } from "./store";
import { initializeAssets } from "./assets";

import AuthenticationScreen from "./screens/Authentication/Authentication.screen";

const store = getStore();
const userIsAuthenticated = false;

const getComponentOrLoading = (assetsReady, userIsAuthenticated) => {
  if(!assetsReady) {
    return (<AppLoading />)
  }
  return userIsAuthenticated?(<Navigation/>):(<AuthenticationScreen/>)
}

export default class App extends Component {
  state = { assetsReady: false,}
  componentDidMount() {
    const showAppContent = () => {this.setState({assetsReady: true})}
    initializeAssets.then(function(response) {
      showAppContent();
    })
  }

  render() {
    return (
      <Provider store={store}>
        {getComponentOrLoading(this.state.assetsReady, userIsAuthenticated)}
      </Provider>
    );
  }
}
