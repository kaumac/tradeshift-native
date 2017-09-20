import React, { Component, PropTypes } from 'react'
import { AsyncStorage, StyleSheet } from 'react-native'
import { Text, View } from 'react-native-animatable'

import { setInitialSessionId } from '../../api/authentication';

import Button from '../../components/Button'
import TextInput from '../../components/TextInput/TextInput.component'
import measures from '../../constants/measures'

export default class SignInForm extends Component {
  static propTypes = {
    // isLoading: PropTypes.bool.isRequired,
    // onSignInPress: PropTypes.func.isRequired,
    // onSignupLinkPress: PropTypes.func.isRequired
  }

  state = {
    email: '',
    password: '',
    fullName: ''
  }

  async authenticate() {
    setInitialSessionId();
    try {
      const value = await AsyncStorage.getItem('@Tradeshift:sessionId');
      if (value !== null){
        console.log(value);
      }
    } catch (error) {
      console.log(error);
    }
  }

  hideForm = async () => {
    if (this.buttonRef && this.formRef && this.linkRef) {
      await Promise.all([
        this.buttonRef.zoomOut(200),
        this.formRef.fadeOut(300),
        this.linkRef.fadeOut(300)
      ])
    }
  }

  render () {
    const { email, password } = this.state
    const { isLoading, onSignupLinkPress, onSignInPress } = this.props
    const isValid = email !== '' && password !== ''
    return (
      <View style={styles.container}>
        <View style={styles.form} ref={(ref) => { this.formRef = ref }}>
          <TextInput
            name={'email'}
            ref={(ref) => this.emailInputRef = ref}
            placeholder={'Email'}
            keyboardType={'email-address'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.passwordInputRef.focus()}
            onChangeText={(value) => this.setState({ email: value })}
            isEnabled={!isLoading}
          />
          <TextInput
            name={'password'}
            ref={(ref) => this.passwordInputRef = ref}
            placeholder={'Password'}
            editable={!isLoading}
            returnKeyType={'done'}
            secureTextEntry={true}
            withRef={true}
            onChangeText={(value) => this.setState({ password: value })}
            isEnabled={!isLoading}
          />
        </View>
        <View style={styles.footer}>
          <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
            <Button
              onPress={() => this.authenticate(email, password)}
              isEnabled={isValid}
              isLoading={isLoading}
              buttonStyle={styles.signInButton}
              textStyle={styles.signInButtonText}
              text={'Log In'}
            />
          </View>
          <Text
            ref={(ref) => this.linkRef = ref}
            style={styles.signupLink}
            // onPress={onSignupLinkPress}
            onPress={() => this.authenticate(email, password)}
            animation={'fadeIn'}
            duration={600}
            delay={400}
          >
            {'Not registered yet?'}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: measures.DEVICE_WIDTH * 0.1
  },
  form: {
    marginTop: 20
  },
  footer: {
    height: 100,
    justifyContent: 'center'
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
  signupLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20
  }
})
