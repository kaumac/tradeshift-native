import React, { Component, PropTypes } from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from 'react-native-animatable'

import Button from '../../components/Button';
import colors from '../../constants/colors';
import measures from '../../constants/measures';

export default class AuthenticationOptions extends Component {
  static propTypes = {
    onCreateAccountPress: PropTypes.func.isRequired,
    onSignInPress: PropTypes.func.isRequired
  }

  render () {
    return (
      <View style={styles.container}>
        <View animation={'zoomIn'} delay={600} duration={400}>
          <Button
            text={'CREATE ACCOUNT'}
            onPress={this.props.onCreateAccountPress}
            buttonStyle={styles.createAccountButton}
            textStyle={styles.createAccountButtonText}
          />
        </View>

        <View style={styles.separatorContainer} animation={'zoomIn'} delay={700} duration={400}>
          <View style={styles.separatorLine} />
          <View style={styles.separatorOrWrapper}>
            <Text style={styles.separatorOr}>{'OR'}</Text>
          </View>
          <View style={styles.separatorLine} />
        </View>

        <View animation={'zoomIn'} delay={800} duration={400}>
          <Button
            text={'SIGN IN'}
            onPress={this.props.onSignInPress}
            buttonStyle={styles.signInButton}
            textStyle={styles.signInButtonText}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: measures.DEVICE_WIDTH * 0.1,
    paddingHorizontal: measures.DEVICE_WIDTH * 0.1,
    justifyContent: 'center'
  },
  createAccountButton: {
    width: '100%',
    height: 48,
    backgroundColor: colors['primary']['default'],
    borderWidth: 0
  },
  createAccountButtonText: {
    fontSize: 14,
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
    borderColor: '#DFDFDF'
  },
  separatorOrWrapper: {
    borderWidth: 1,
    borderColor: '#DFDFDF',
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
    color: '#DFDFDF',
    fontSize: 12
  },
  signInButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#FFFFFF',
    borderColor: '#DFDFDF',
    borderWidth: 1
  },
  signInButtonText: {
    fontSize: 14,
    color: '#333333'
  }
})
