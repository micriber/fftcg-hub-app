import React from 'react';
import {StyleSheet, SafeAreaView, Text, Alert} from 'react-native';
import {
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import isEmpty from 'lodash.isempty';
import {AuthContext} from '../../AuthContext';

type Props = {};

type ErrorWithCode = Error & {code?: string};

type State = {
  error: ErrorWithCode | null;
};

export default class Login extends React.Component<Props, State> {
  static contextType = AuthContext;

  state: State = {
    error: null,
  };

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
      await this.context.signIn();
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
