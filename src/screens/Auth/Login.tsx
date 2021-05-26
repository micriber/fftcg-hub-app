import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GoogleSigninButton} from '@react-native-community/google-signin';
import {AuthContext} from '../../contexts/AuthContext';
import {withTheme} from 'react-native-paper';
// @ts-ignore
import VectorLoginPortrait from '../../assets/svg/login-portrait.svg';
// @ts-ignore
import VectorLoginLandscape from '../../assets/svg/login-landscape.svg';
import {screenFonts} from '../../theme';

type Props = {
  theme: ReactNativePaper.Theme;
};

type ErrorWithCode = Error & {code?: string};

type State = {
  error: ErrorWithCode | null;
  portrait: boolean;
  screenWidth: number;
  screenHeight: number;
};

class Login extends React.Component<Props, State> {
  static contextType = AuthContext;

  state: State = {
    error: null,
    portrait: true,
    screenWidth: 0,
    screenHeight: 0,
  };

  constructor(props: Props, state: State) {
    super(props, state);

    const w = Dimensions.get('window');

    this.state = {
      ...state,
      portrait: w.width < w.height,
      screenWidth: w.width,
      screenHeight: w.height,
    };
  }
  styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: this.props.theme.colors.active,
    },
    svgTop: {
      flex: 1,
      marginTop: -(StatusBar.currentHeight ?? 0),
    },
    svgBottom: {
      rotation: 180,
      marginTop: StatusBar.currentHeight ?? 0,
    },
    containerCenter: {
      flexDirection: this.state.portrait ? 'column' : 'row',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'flex-start',
      marginBottom: -(StatusBar.currentHeight ?? 0) * 2.5,
    },
    containerLogo: {
      alignItems: 'center',
      width: this.state.portrait ? '100%' : '50%',
    },
    titre: {
      fontSize: 48,
      color: this.props.theme.colors.lightGrey,
      fontFamily: screenFonts.login.title,
    },
    googleButton: {
      alignItems: 'center',
      flex: 1,
    },
  });

  componentDidMount() {
    Dimensions.addEventListener('change', ({window}) => {
      this.setState({
        error: null,
        portrait: window.width < window.height,
        screenWidth: window.width,
        screenHeight: window.height,
      });
    });
  }

  render() {
    return (
      <View style={this.styles.container}>
        <View style={this.styles.svgTop}>
          {this.state.portrait ? (
            <VectorLoginPortrait
              height={(this.state.screenWidth + 10) / 2.25}
              width={this.state.screenWidth + 10}
              fill={this.props.theme.colors.accent}
            />
          ) : (
            <VectorLoginLandscape
              height={this.state.screenWidth / 5}
              width={this.state.screenWidth}
              fill={this.props.theme.colors.accent}
            />
          )}
        </View>
        <View style={this.styles.containerCenter}>
          <View style={this.styles.containerLogo}>
            <Image source={require('../../assets/logo/round.png')} />
            <Text style={this.styles.titre}>FFTCG Hub</Text>
          </View>
          <SafeAreaView style={this.styles.googleButton}>
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Standard}
              color={GoogleSigninButton.Color.Light}
              onPress={async () => {
                this.context.signIn();
              }}
            />
          </SafeAreaView>
        </View>
        <View style={this.styles.svgBottom}>
          {this.state.portrait ? (
            <VectorLoginPortrait
              height={this.state.screenWidth / 2.25}
              width={this.state.screenWidth}
              fill={this.props.theme.colors.accent}
            />
          ) : (
            <VectorLoginLandscape
              height={this.state.screenWidth / 5}
              width={this.state.screenWidth}
              fill={this.props.theme.colors.accent}
            />
          )}
        </View>
      </View>
    );
  }
}

export default withTheme(Login);
