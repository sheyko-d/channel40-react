import React from "react";
import {
  AppRegistry,
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { StackNavigator, NavigationActions } from "react-navigation";
import TimerMixin from "react-timer-mixin";
import DriverHomeScreen from "./src/driver/DriverHomeScreen";
import MainTabs from "./src/driver/MainTabs";
import MainDrawer from "./src/driver/MainDrawer";
import SplashScreen from "./src/login/SplashScreen";
import SignInScreen from "./src/login/SignInScreen";
import SignUpScreen from "./src/login/SignUpScreen";
import FingerprintScreen from "./src/fingerprint/FingerprintScreen";
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
    flexDirection: "column"
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
        <StatusBar barStyle="light-content" backgroundColor="#202933" />
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
      "Akkurat-Normal": require("./assets/fonts/Akkurat-Normal.ttf")
    });

    this.setState({ fontLoaded: true });

    this.timer = setTimeout(() => {
      this.resetNavigation(/*"SplashScreen"*/ /*"MainTabs"*/ "FingerprintScreen");
    }, 2000);
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
    SignUpScreen: { screen: SignUpScreen },
    MainTabs: { screen: MainTabs },
    FingerprintScreen: { screen: FingerprintScreen },
    MainDrawer: {
      screen: MainDrawer,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <DrawerButton navigation={navigation} />
      })
    },
    SplashScreen: { screen: SplashScreen }
  },
  {
    headerMode: "screen"
  }
);

export default SimpleApp;
