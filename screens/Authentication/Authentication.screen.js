import React, { Component, PropTypes } from 'react'
import { KeyboardAvoidingView, LayoutAnimation, Platform, StyleSheet, UIManager } from 'react-native'
import { Image, View } from 'react-native-animatable'

import imgLogo from '../../assets/appIconSimple.png'
import colors from '../../constants/colors'
import measures from '../../constants/measures'

import AuthenticationOptions from './AuthenticationOptions'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'

if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental(true)

export default class AuthScreen extends Component {
  static propTypes = {
    // isLoggedIn: PropTypes.bool.isRequired,
    // isLoading: PropTypes.bool.isRequired,
    // signup: PropTypes.func.isRequired,
    // login: PropTypes.func.isRequired,
    // onSignInAnimationCompleted: PropTypes.func.isRequired // Called at the end of a succesfull login/signup animation
  }

  state = {
    visibleForm: null // Can be: null | SIGNUP | LOGIN
  }

  componentWillUpdate (nextProps) {
    // If the user has logged/signed up succesfully start the hide animation
    if (!this.props.isLoggedIn && nextProps.isLoggedIn) {
      this._hideAuthScreen()
    }
  }

  _hideAuthScreen = async () => {
    // 1. Slide out the form container
    await this._setVisibleForm(null)
    // 2. Fade out the logo
    await this.logoImgRef.fadeOut(800)
    // 3. Tell the container (app.js) that the animation has completed
    this.props.onSignInAnimationCompleted()
  }

  _setVisibleForm = async (visibleForm) => {
    // 1. Hide the current form (if any)
    if (this.state.visibleForm && this.formRef && this.formRef.hideForm) {
      await this.formRef.hideForm()
    }
    // 2. Configure a spring animation for the next step
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    // 3. Set the new visible form
    this.setState({ visibleForm })
  }

  render () {
    const { isLoggedIn, isLoading, signup, login } = this.props
    const { visibleForm } = this.state
    // The following style is responsible of the "bounce-up from bottom" animation of the form
    const formStyle = (!visibleForm) ? { height: 0 } : { marginTop: 60 }
    return (
      <View style={styles.container}>
        <Image
          animation={'bounceIn'}
          duration={1200}
          delay={200}
          ref={(ref) => this.logoImgRef = ref}
          style={styles.logoImg}
          source={imgLogo}
        />
        {(!visibleForm && !isLoggedIn) && (
          <AuthenticationOptions
            onCreateAccountPress={() => this._setVisibleForm('SIGNUP')}
            onSignInPress={() => this._setVisibleForm('LOGIN')}
          />
        )}
        <KeyboardAvoidingView
          keyboardVerticalOffset={-100}
          behavior={'padding'}
          style={[formStyle, styles.bottom]}
        >
          {(visibleForm === 'SIGNUP') && (
            <SignUpForm
              ref={(ref) => this.formRef = ref}
              onSignInLinkPress={() => this._setVisibleForm('LOGIN')}
              onSignUpPress={signup}
              isLoading={isLoading}
            />
          )}
          {(visibleForm === 'LOGIN') && (
            <SignInForm
              ref={(ref) => this.formRef = ref}
              onSignupLinkPress={() => this._setVisibleForm('SIGNUP')}
              onSignInPress={login}
              isLoading={isLoading}
            />
          )}
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: measures.DEVICE_WIDTH,
    height: measures.DEVICE_HEIGHT,
    paddingTop: 24,
    backgroundColor: 'white'
  },
  logoImg: {
    flex: 1,
    height: null,
    width: measures.DEVICE_WIDTH * 0.5,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 30
  },
  bottom: {
    backgroundColor: colors['primary']['default']
  }
})


























// import React from 'react';
// import PropTypes from 'prop-types';
// import { Image, StatusBar, StyleSheet, Text, View, Platform } from 'react-native';
// import { LinearGradient } from 'expo';
//
// import tradeshiftLogo from '../../assets/appIconSimple.png'
// import Button from '../../components/Button';
// import measures from '../../constants/measures';
// import colors from '../../constants/colors';
//
// if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental(true)
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: '#FFFFFF'
//   },

//   signUpButton: {
//     width: 600,
//     maxWidth: '100%',
//     backgroundColor: '#FFFFFF'
//   },
//   signUpButtonText: {
//     color: colors['primary']['default'],
//     fontSize: 14
//   },
//   createAccountButton: {
//     backgroundColor: '#9B9FA4'
//   },
//   createAccountButtonText: {
//     color: 'white'
//   },

//   tradeshiftLogo: {
//     height: measures.DEVICE_WIDTH * 0.4,
//     width: measures.DEVICE_WIDTH * 0.4,
//     alignSelf: 'center',
//     resizeMode: 'contain',
//     marginVertical: 10,
//     borderRadius: measures.DEVICE_WIDTH * 0.03
//   }
// })
//
// export default class Authentication extends React.Component {
//   static navigationOptions = ({ navigation }) => ({
//     title: `Chat with ${'me'}`,
//     headerRight: <Text>dfsdsdg</Text>
//   });
//
//   static propTypes = {}
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <StatusBar
//           barStyle="dark-content"
//         />
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//           <Image
//             animation={'bounceIn'}
//             duration={1200}
//             delay={200}
//             ref={(ref) => this.logoImgRef = ref}
//             style={styles.tradeshiftLogo}
//             source={tradeshiftLogo}
//           />
//         </View>
//         <View
//           style={{paddingVertical: 60, paddingHorizontal: 40, alignItems: 'center', backgroundColor: colors['primary']['default']}}
//         >
//           <Button
//             onPress={() => console.log('bla')}
//             isEnabled={true}
//             isLoading={false}
//             buttonStyle={styles.signUpButton}
//             textStyle={styles.signUpButtonText}
//             text="CREATE ACCOUNT"
//           />
//

//
//
//           <Button
//             onPress={() => console.log('bla')}
//             isEnabled={true}
//             isLoading={false}
//             buttonStyle={styles.signInButton}
//             textStyle={styles.signInButtonText}
//             text={'SIGN IN'}
//           />
//         </View>
//
//       </View>
//     );
//   }
// }
