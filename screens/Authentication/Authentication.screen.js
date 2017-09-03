import React from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo';

import Button from '../../components/Button';
import measures from '../../constants/measures';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#DFDFDF'
  },
  loginButton: {
    width: 600,
    maxWidth: '100%',
    backgroundColor: '#FFFFFF'
  },
  loginButtonText: {
    color: '#464646',
    fontSize: 16
  },
  createAccountButton: {
    backgroundColor: '#9B9FA4'
  },
  createAccountButtonText: {
    color: 'white'
  },
  separatorContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20
  },
  separatorLine: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.5)'
  },
  separatorOr: {
    color: 'rgba(255,255,255,0.5)',
    marginHorizontal: 10
  },
  signInButton: {
    backgroundColor: '#1976D2'
  },
  signInButtonText: {
    color: 'white'
  }
})

export default class Authentication extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${'me'}`,
    headerRight: <Text>dfsdsdg</Text>
  });

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
        />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('../../assets/images/logo/tradeshift-logo-light.png')}
            style={{width: 227, height: 27}}
          />
        </View>
        <View
          style={{padding: 40, alignItems: 'center', backgroundColor: colors['primary']['default']}}
        >
          <Button
            onPress={() => console.log('bla')}
            isEnabled={true}
            isLoading={false}
            buttonStyle={styles.loginButton}
            textStyle={styles.loginButtonText}
            text={'Log In'}
          />

          <View style={styles.separatorContainer} animation={'zoomIn'} delay={700} duration={400}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorOr}>{'Or'}</Text>
            <View style={styles.separatorLine} />
          </View>


          <Button
            onPress={() => console.log('bla')}
            isEnabled={true}
            isLoading={false}
            buttonStyle={styles.loginButton}
            textStyle={styles.loginButtonText}
            text={'Log In'}
          />
      </View>

      </View>
    );
  }
}
