import React from 'react';
import {SafeAreaView, Text, Alert, View, Dimensions, Image} from 'react-native';
import {
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import isEmpty from 'lodash.isempty';
import {AuthContext} from '../../contexts/AuthContext';
import {Theme} from 'react-native-paper/lib/typescript/types';
import {withTheme} from 'react-native-paper';
import Vector from '../../assets/svg/login.svg';

type Props = {
  theme: Theme;
};

type ErrorWithCode = Error & {code?: string};

type State = {
  error: ErrorWithCode | null;
};

class Login extends React.Component<Props, State> {
  static contextType = AuthContext;

  state: State = {
    error: null,
  };

  render() {
    const w = Dimensions.get('window');
    return (
      <View style={{flex: 1, backgroundColor: this.props.theme.colors.active}}>
        <View style={{flex: 1}}>
          <Vector
            height={(w.width + 10) / 2.25}
            width={w.width + 10}
            fill={this.props.theme.colors.accent}
          />
        </View>
        <View
          style={{alignItems: 'center', flex: 1, justifyContent: 'flex-start'}}>
          <Image source={require('../../assets/logo/round.png')} />
          <Text
            style={{
              fontSize: 48,
              color: this.props.theme.colors.gris_clair,
              fontFamily: 'AbhayaLibre-Regular',
            }}>
            FFTCG Hub
          </Text>
        </View>
        <SafeAreaView
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Light}
            onPress={async () => {
              this.context.signIn();
            }}
          />
        </SafeAreaView>
        <View style={{rotation: 180}}>
          <Vector
            height={(w.width + 10) / 2.25}
            width={w.width + 10}
            fill={this.props.theme.colors.accent}
          />
        </View>
      </View>
    );
  }
}

export default withTheme(Login);
