import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Button from '../../components/Button';

import colors from '../../constants/colors';

export default class Login extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${'me'}`,
    headerRight: <Text>dfsdsdg</Text>
  });

  render() {
    console.log(colors.primary.default);
    return (
      <View style={styles.container}>
        <Text>Open up Login.js to start working on your app!</Text>
        <Text>Changes you make will autosdfsdfdsfmatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>

        <Button
          onPress={() => console.log('bla')}
          isEnabled={true}
          isLoading={false}
          buttonStyle={styles.loginButton}
          textStyle={styles.loginButtonText}
          text={'Log In'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  },
  form: {
    marginTop: 20
  },
  footer: {
    height: 100,
    justifyContent: 'center'
  },
  loginButton: {
    backgroundColor: 'white'
  },
  loginButtonText: {
    color: '#3E464D',
    fontWeight: 'bold'
  },
  signupLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20
  }
})
