import { Components } from "expo";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { Text, ActivityIndicator } from "react-native";

import Navigation from "./Navigation";
import { getStore } from "./store";
import { initializeAssets } from "./assets";

import AuthenticationScreen from "./screens/Authentication/Authentication.screen";

const store = getStore();
const userIsAuthenticated = false;

const Testeiro = (assetsReady, userIsAuthenticated) => {
  if(!assetsReady) {
    return (<ActivityIndicator />)
  }

  return userIsAuthenticated ? (
    <Navigation />
  ) : (
    <AuthenticationScreen />
  )
}

export default class App extends Component {
  state = {
    assetsReady: false,
  }

  componentDidMount() {
    const showAppContent = () => {
      this.setState({assetsReady: true});
    }

    initializeAssets.then(function(response) {
      showAppContent();
    }).catch(function(error) {
      console.log(error);
    });
  }

  render() {
    return (
      <Provider store={store}>
        {Testeiro(this.state.assetsReady, userIsAuthenticated)}
      </Provider>
    );
  }
}
