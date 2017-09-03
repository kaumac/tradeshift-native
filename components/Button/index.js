import React, { PropTypes } from 'react'
import { ActivityIndicator, StyleSheet, Text } from 'react-native'
import { View } from 'react-native-animatable'

import TouchableView from '../TouchableView'

const Button = ({ onPress, isEnabled, isLoading, text, buttonStyle, textStyle, ...otherProps }) => {
  const onButtonPress = isEnabled && !isLoading ? onPress : () => null

  return (
    <View {...otherProps}>
      <TouchableView onPress={onButtonPress} style={[styles.button, buttonStyle]}>
        {(isLoading) && <ActivityIndicator style={styles.spinner} color={'grey'} />}
        {(!isLoading) && <Text style={[styles.text, textStyle]}>{text}</Text>}
      </TouchableView>
    </View>
  )
}

Button.propTypes = {
  onPress: PropTypes.func,
  isEnabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  text: PropTypes.string,
  buttonStyle: PropTypes.any,
  textStyle: PropTypes.any
}

Button.defaultProps = {
  onPress: () => null,
  isEnabled: true,
  isLoading: false
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderWidth: 1,
    borderRadius: 24,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: '50%'
  },
  spinner: {
    height: 26
  },
  text: {
    textAlign: 'center',
    fontWeight: '400',
    color: 'white',
    fontFamily: 'open-sans',
    backgroundColor: 'transparent'
  }
})

export default Button;
