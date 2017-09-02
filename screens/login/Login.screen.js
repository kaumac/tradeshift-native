import React from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo';

import Button from '../../components/Button';

import colors from '../../constants/colors';



export default class Login extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${'me'}`,
    headerRight: <Text>dfsdsdg</Text>
  });

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
        <LinearGradient
          colors={['#00ADFF', '#0047E8']}
          style={{ flex: 1, padding: 15, alignItems: 'center'}}
        >
          <Image
            source={require('../../images/logo/tradeshift-logo-light.png')}
            style={{width: 227, height: 27, marginVertical: 100}}
          />

          <Button
            onPress={() => console.log('bla')}
            isEnabled={true}
            isLoading={false}
            buttonStyle={styles.loginButton}
            textStyle={styles.loginButtonText}
            text={'Log In'}
          />
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  form: {
    marginTop: 20
  },
  footer: {
    height: 100,
    justifyContent: 'center'
  },
  loginButton: {
    width: '100%',
    backgroundColor: colors['primary']['default']
  },
  loginButtonText: {
    color: '#FFFFFF'
  },
  signupLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20
  }
})
