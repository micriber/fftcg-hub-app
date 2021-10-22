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
import Logo from '../../assets/logo/logo.svg';
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

  render() {
    const styles = StyleSheet.create({
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
        marginBottom: '60%',
      },
      containerLogo: {
        alignItems: 'center',
        width: '100%',
        marginBottom: this.props.upgrade ? '15%' : '25%',
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

    return (
      <View style={styles.container}>
        <View style={styles.svgTop}>
          <VectorLogin
            height={(window.width + 10) / 2.25}
            width={window.width + 10}
            fill={this.props.theme.colors.accent}
          />
        </View>
        <View style={styles.containerCenter}>
          <View style={styles.containerLogo}>
            <View style={{
              marginBottom: '8%'
            }}>
              <Logo
                height={120}
                width={120}
              />
            </View>
            {/*<Animated.Image*/}
            {/*  source={require('../../assets/logo/round.png')}*/}
            {/*  style={{*/}
            {/*    transform: [{rotateY: this.spin}],*/}
            {/*    marginBottom: '5%',*/}
            {/*  }}*/}
            {/*/>*/}
            {/*<Text style={styles.titre}>Fantasy</Text>*/}
            {/*<Text style={styles.titre}>Card</Text>*/}
            {/*<Text style={styles.titre}>Collection</Text>*/}
          </View>
          {this.props.upgrade && (
            <View style={styles.upgradeContainer}>
              <Text style={styles.upgradeText}>
                Votre application n'est plus à jour. Merci de la mettre à jour
                sur le store.
              </Text>
              <Button
                style={styles.upgradeButton}
                onPress={async () => {
                  await Linking.openURL(
                    Platform.OS === 'ios'
                      ? config.url.appStore
                      : config.url.playStore,
                  );
                }}>
                Mettre à jour
              </Button>
            </View>
          )}
          {!this.props.upgrade && (
            <SafeAreaView style={styles.googleButton}>
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
        <View style={styles.svgBottom}>
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
