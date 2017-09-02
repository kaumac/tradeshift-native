import React, { Component } from "react";
import { Text } from "react-native";
import { Font } from "expo";
import { Provider, connect } from "react-redux";
import { StackNavigator, addNavigationHelpers } from "react-navigation";

import { routes } from "./navigation";
import LoginScreen from "./screens/login/Login.screen";
import { getStore } from "./store";

const AppNavigator = StackNavigator(routes, {
  navigationOptions: ({navigation}) => ({
    title: navigation.state.title
  })
});

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};

@connect(state => ({
  navigation: state.navigation
}))
class AppWithNavigationState extends Component {
  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.navigation
        })}
      />
    );
  }
}

const store = getStore(navReducer);

const userIsAuthenticated = false;

export default function NCAP() {
  return (
    <Provider store={store}>
      {
        userIsAuthenticated ? (
          <AppWithNavigationState />
        ) : (
          <LoginScreen />
        )
      }

    </Provider>
  );
}
