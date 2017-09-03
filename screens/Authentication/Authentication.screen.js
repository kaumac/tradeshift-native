import React from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo';

import Button from '../../components/Button';

import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loginButton: {
    width: 240,
    maxWidth: '100%',
    backgroundColor: '#FFFFFF'
  },
  loginButtonText: {
    color: '#464646',
    fontSize: 16
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
          style={{paddingVertical: 30, alignItems: 'center', backgroundColor: colors['primary']['default']}}
        >
          <Button
            onPress={() => console.log('bla')}
            isEnabled={true}
            isLoading={false}
            buttonStyle={styles.loginButton}
            textStyle={styles.loginButtonText}
            text={'Log In'}
          />

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
