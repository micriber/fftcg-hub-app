import React from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {GoogleSigninButton} from '@react-native-community/google-signin';
import {AuthContext} from '../../contexts/AuthContext';
import {Button, withTheme} from 'react-native-paper';
// @ts-ignore
import VectorLogin from '../../assets/svg/login.svg';
import {screenFonts} from '../../theme';
import {config} from '../../config';

type Props = {
  theme: ReactNativePaper.Theme;
  upgrade: boolean;
};

type ErrorWithCode = Error & {code?: string};

type State = {
  error: ErrorWithCode | null;
};

const window = Dimensions.get('window');

class Login extends React.Component<Props, State> {
  static contextType = AuthContext;

  state: State = {
    error: null,
  };
  private readonly spin: any;

  constructor(props: Props, state: State) {
    super(props, state);
    const spinValue = new Animated.Value(0);
    this.spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    const anim = Animated.timing(spinValue, {
      toValue: 1,
      duration: 750,
      easing: Easing.linear,
      useNativeDriver: true,
    });
    setInterval(() => {
      anim.start(() => spinValue.setValue(0));
    }, 3000);
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
      transform: [
        {
          rotate: '180deg',
        },
      ],
      marginTop: StatusBar.currentHeight ?? 0,
    },
    containerCenter: {
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'flex-start',
      marginBottom: this.props.upgrade ? '60%' : '20%',
    },
    containerLogo: {
      alignItems: 'center',
      width: '100%',
      marginBottom: this.props.upgrade ? '15%' : '25%',
    },
    titre: {
      marginTop: '3%',
      fontSize: 48,
      color: this.props.theme.colors.lightGrey,
      fontFamily: screenFonts.login.title,
    },
    googleButton: {
      alignItems: 'center',
      flex: 1,
    },
    upgradeContainer: {
      marginHorizontal: '12%',
    },
    upgradeText: {
      fontSize: 18,
      color: this.props.theme.colors.darkGrey,
      marginBottom: '20%',
      textAlign: 'center',
    },
    upgradeButton: {
      backgroundColor: this.props.theme.colors.background,
    },
  });

  render() {
    return (
      <View style={this.styles.container}>
        <View style={this.styles.svgTop}>
          <VectorLogin
            height={(window.width + 10) / 2.25}
            width={window.width + 10}
            fill={this.props.theme.colors.accent}
          />
        </View>
        <View style={this.styles.containerCenter}>
          <View style={this.styles.containerLogo}>
            <Animated.Image
              source={require('../../assets/logo/round.png')}
              style={{
                transform: [{rotateY: this.spin}],
              }}
            />
            <Text style={this.styles.titre}>FFTCG Hub</Text>
          </View>
          {this.props.upgrade && (
            <View style={this.styles.upgradeContainer}>
              <Text style={this.styles.upgradeText}>
                Votre application n'est plus compatible, merci de passer sur le
                store pour mettre a jour avec la derniere version
              </Text>
              <Button
                style={this.styles.upgradeButton}
                onPress={async () => {
                  await Linking.openURL(
                    Platform.OS === 'ios'
                      ? config.url.appStore
                      : config.url.playStore,
                  );
                }}>
                Mettre a jour
              </Button>
            </View>
          )}
          {!this.props.upgrade && (
            <SafeAreaView style={this.styles.googleButton}>
              <GoogleSigninButton
                size={GoogleSigninButton.Size.Standard}
                color={GoogleSigninButton.Color.Light}
                onPress={async () => {
                  this.context.signIn();
                }}
              />
            </SafeAreaView>
          )}
        </View>
        <View style={this.styles.svgBottom}>
          <VectorLogin
            height={window.width / 2.25}
            width={window.width}
            fill={this.props.theme.colors.accent}
          />
        </View>
      </View>
    );
  }
}

export default withTheme(Login);
