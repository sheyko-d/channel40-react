import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { StackNavigator } from "react-navigation";

const styles = StyleSheet.create({
  splash_background: {
    width: "100%",
    height: "100%",
    backgroundColor: "#202933",
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 32,
    paddingBottom: 16
  },
  logo_image: {
    width: 130,
    resizeMode: "contain"
  },
  splash_slogan: {
    color: "#FFF",
    fontSize: 39,
    marginTop: 28,
    fontFamily: "AvenirLTStd-Black"
  },
  buttons_wrapper: {
    flexDirection: "row"
  },
  button: {
    textAlign: "center",
    fontFamily: "Graystroke-Regular",
    backgroundColor: "#f26522",
    color: "#FFF",
    borderRadius: 2,
    paddingBottom: 12,
    paddingTop: 10,
    paddingLeft: 16,
    paddingRight: 16
  },
  create_account_button: {
    flex: 1,
    alignSelf: "stretch",
    marginLeft: 16
  }
});

class DriverHomeScreen extends React.Component {
  static navigationOptions = {
    title: "Splash",
    header: null
  };
  render() {
    return (
      <View>
        <StatusBar barStyle="light-content" backgroundColor="#202933" />
        <Image
          style={styles.splash_background}
          source={require("../../assets/icons/splash.jpg")}
        >
          <View style={{ flex: 1 }}>
            <Image
              style={styles.logo_image}
              fadeDuration={0}
              source={require("../../assets/icons/app_logo.png")}
            />
            <Text style={styles.splash_slogan}>
              Moving loads accross Australia.
            </Text>
            <View style={{ flex: 1 }} />
            <View style={styles.buttons_wrapper}>
              <TouchableOpacity activeOpacity={0.7} onPress={this.signIn}>
                <Text style={styles.button}>SIGN IN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.create_account_button}
                activeOpacity={0.7}
                onPress={this.signIn}
              >
                <Text style={styles.button}>GET YOUR FREE ACCOUNT</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Image>
      </View>
    );
  }
  signIn() {}
}

export default DriverHomeScreen;
