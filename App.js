import React from "react";
import {
  AppRegistry,
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import { StackNavigator, NavigationActions } from "react-navigation";
import TimerMixin from "react-timer-mixin";
import MainDrawer from "./src/driver/MainDrawer";
import SplashScreen from "./src/login/SplashScreen";
import SignInScreen from "./src/login/SignInScreen";
import SignInScreenKeycloak from "./src/login/SignInScreenKeycloak";
import SignUpScreen from "./src/login/SignUpScreen";
import FingerprintScreen from "./src/fingerprint/FingerprintScreen";
import PinScreen from "./src/fingerprint/PinScreen";
import FindLoadsScreen from "./src/driver/home/findloads/FindLoadsScreen";
import { Font } from "expo";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  logo_wrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgba(0,0,0,0)"
  },
  logo_background: {
    width: "100%",
    height: "100%",
    backgroundColor: "#202933",
    paddingBottom: 128
  },
  logo_image: {
    width: 130,
    resizeMode: "contain",
    marginBottom: 4
  },
  drawer_icon: {
    width: 20,
    height: 20,
    marginLeft: 20
  }
});

class LoadingScreen extends React.Component {
  state = {
    fontLoaded: false
  };
  static navigationOptions = {
    title: "Welcome",
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <StatusBar translucent backgroundColor="rgba(255, 255, 255, 0)" />
        <Image
          style={styles.logo_background}
          source={require("./assets/icons/loading.jpg")}
        >
          {this.state.fontLoaded ? (
            <View style={styles.logo_wrapper}>
              <Image
                style={styles.logo_image}
                fadeDuration={0}
                source={require("./assets/icons/app_logo.png")}
              />
              <Text style={{ color: "#FFF", fontFamily: "Akkurat-Normal" }}>
                Moving loads accross Australia.
              </Text>
            </View>
          ) : null}
        </Image>
      </View>
    );
  }

  async componentDidMount() {
    await Font.loadAsync({
      "Graystroke-Regular": require("./assets/fonts/Graystroke-Regular.otf"),
      "AvenirLTStd-Black": require("./assets/fonts/AvenirLTStd-Black.otf"),
      "AvenirLTStd-Heavy": require("./assets/fonts/AvenirLTStd-Heavy.otf"),
      "Akkurat-Normal": require("./assets/fonts/Akkurat-Normal.ttf")
    });

    this.setState({ fontLoaded: true });
    this.timer = setTimeout(() => {
      this.openNextScreen();
    }, 2000);
  }

  async openNextScreen() {
    let profile = await AsyncStorage.getItem("profile");
    if (!profile) {
      this.resetNavigation("SplashScreen");
      return;
    }

    // Check if device have a fingerprint scanner
    // and if some fingerprints are enrolled
    let hasHardwareAsync = await Expo.Fingerprint.hasHardwareAsync();
    let isEnrolledAsync = await Expo.Fingerprint.isEnrolledAsync();
    if (hasHardwareAsync && isEnrolledAsync) {
      this.resetNavigation("FingerprintScreen");
    } else {
      this.checkPinEnabled();
    }
  }

  async checkPinEnabled() {
    let pin = await AsyncStorage.getItem("pin");
    if (pin) {
      if (
        Expo.Fingerprint.hasHardwareAsync() &&
        Expo.Fingerprint.isEnrolledAsync()
      ) {
        this.resetNavigation("FingerprintScreen");
      } else {
        this.resetNavigation("PinScreen");
      }
    } else {
      this.resetNavigation("MainDrawer");
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  resetNavigation = targetRoute => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: targetRoute })]
    });
    this.props.navigation.dispatch(resetAction);
  };
}

const DrawerButton = props => {
  const { navigate } = props.navigation;
  const routeIndex = props.navigation.state.index;
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          routeIndex === 0 ? navigate("DrawerOpen") : navigate("DrawerClose");
        }}
      >
        <Image
          source={require("./assets/icons/ic_drawer.png")}
          style={styles.drawer_icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const SimpleApp = StackNavigator(
  {
    LoadingScreen: { screen: LoadingScreen },
    SplashScreen: { screen: SplashScreen },
    SignInScreen: { screen: SignInScreen },
    SignInScreenKeycloak: { screen: SignInScreenKeycloak },
    SignUpScreen: { screen: SignUpScreen },
    FingerprintScreen: { screen: FingerprintScreen },
    PinScreen: { screen: PinScreen },
    MainDrawer: {
      screen: MainDrawer,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <DrawerButton navigation={navigation} />
      })
    },
    SplashScreen: { screen: SplashScreen },
    FindLoadsScreen: { screen: FindLoadsScreen }
  },
  {
    headerMode: "screen"
  }
);

export default SimpleApp;
