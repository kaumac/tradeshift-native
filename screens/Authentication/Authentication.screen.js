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
  signInButton: {
    width: 600,
    maxWidth: '100%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,1)'
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 14
  },
  signUpButton: {
    width: 600,
    maxWidth: '100%',
    backgroundColor: '#FFFFFF'
  },
  signUpButtonText: {
    color: colors['primary']['default'],
    fontSize: 14
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
    marginVertical: 10
  },
  separatorLine: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.5)'
  },
  separatorOrWrapper: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: "transparent",
    borderRadius: 16,
    width: 32,
    height: 32,
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  separatorOr: {
    color: "#333",
    backgroundColor: "transparent",
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12
  },
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
            source={require('../../assets/images/logo/tradeshift-logo.png')}
            style={{width: 227, height: 27}}
          />
        </View>
        <View
          style={{paddingVertical: 60, paddingHorizontal: 40, alignItems: 'center', backgroundColor: colors['primary']['default']}}
        >
          <Button
            onPress={() => console.log('bla')}
            isEnabled={true}
            isLoading={false}
            buttonStyle={styles.signUpButton}
            textStyle={styles.signUpButtonText}
            text="CREATE ACCOUNT"
          />

          <View style={styles.separatorContainer} animation={'zoomIn'} delay={700} duration={400}>
            <View style={styles.separatorLine} />
            <View style={styles.separatorOrWrapper}>
              <Text style={styles.separatorOr}>{'OR'}</Text>
            </View>
            <View style={styles.separatorLine} />
          </View>


          <Button
            onPress={() => console.log('bla')}
            isEnabled={true}
            isLoading={false}
            buttonStyle={styles.signInButton}
            textStyle={styles.signInButtonText}
            text={'SIGN IN'}
          />
      </View>

      </View>
    );
  }
}
