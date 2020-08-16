import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, SafeAreaView, Text, Alert} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import isEmpty from 'lodash.isempty';

import {config} from '../config';

export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Login: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

type ErrorWithCode = Error & {code?: string};

type State = {
  error: ErrorWithCode | null;
};

export default class Login extends React.Component<Props, State> {
  state: State = {
    error: null,
  };

  async componentDidMount() {
    this._configureGoogleSignIn();
    await this._getCurrentUser();
  }
  _configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: config.google.webClientId,
      offlineAccess: false,
    });
  }

  async _getCurrentUser() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      if (userInfo) {
        this.props.navigation.navigate('Home');
      }
      this.setState({error: null});
    } catch (error) {
      const errorMessage =
        error.code === statusCodes.SIGN_IN_REQUIRED ? '' : error.message;
      this.setState({
        error: new Error(errorMessage),
      });
    }
  }

  render() {
    return (
      <SafeAreaView style={[styles.container, styles.pageContainer]}>
        {this.renderSignInButton()}
      </SafeAreaView>
    );
  }

  renderSignInButton() {
    return (
      <SafeAreaView style={styles.container}>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this._signIn}
        />
        {this.renderError()}
      </SafeAreaView>
    );
  }

  renderError() {
    const {error} = this.state;

    if (error && !isEmpty(error)) {
      const msg = `${JSON.stringify(this.state)} | ${error.toString()} ${
        error.code ? error.code : ''
      }`;
      return <Text>{msg}</Text>;
    }

    return null;
  }

  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      this.setState({error: null});
      this.props.navigation.navigate('Home');
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // sign in was cancelled
          Alert.alert('Connexion interrompue.');
          break;
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          Alert.alert('Connexion en cours.');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // android only
          Alert.alert(
            "Play services n'est pas installé ou est une version trop ancienne.",
          );
          break;
        default:
          Alert.alert('Something went wrong', error.toString());
          this.setState({
            error,
          });
      }
    }
  };
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  userInfo: {fontSize: 18, fontWeight: 'bold', marginBottom: 20},
  pageContainer: {flex: 1},
});
