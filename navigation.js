import React, { Component } from "react";
import { connect } from "react-redux";
import { StackNavigator, addNavigationHelpers } from "react-navigation";

import Authentication from "./screens/Authentication/Authentication.screen";

export const routes = {
  Authentication: { screen: Authentication }
};

export const Navigator = StackNavigator(routes, {
  navigationOptions: ({navigation}) => ({
    title: navigation.state.title
  })
});

@connect(state => ({
  navigation: state.navigation
}))
export default class Navigation extends Component {
  render() {
    return (
      <Navigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.navigation
        })}
      />
    );
  }
}
