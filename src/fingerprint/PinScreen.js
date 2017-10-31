import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  Image,
  Animated,
  TextInput,
  Keyboard,
  BackHandler,
  AsyncStorage
} from "react-native";
import { NavigationActions } from "react-navigation";
import TimerMixin from "react-timer-mixin";
import md5 from "react-native-md5";

var WEBVIEW_REF = "webview";
var self;
const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24
  },
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  pin_title: {
    fontSize: 16,
    fontFamily: "Akkurat-Normal",
    color: "#333",
    lineHeight: 25,
    marginTop: Platform.OS === "ios" ? 0 : -8
  },
  pin_subtitle: {
    fontSize: 16,
    fontFamily: "Graystroke-Regular",
    fontWeight: "200",
    color: "#333",
    marginTop: 36,
    alignSelf: "center"
  },
  divider: {
    backgroundColor: "#e0e0e0",
    height: StyleSheet.hairlineWidth,
    width: "100%"
  },
  bottom_text: {
    fontSize: 16,
    fontFamily: "Akkurat-Normal",
    color: "#333",
    padding: 16,
    textAlign: "center",
    width: "100%"
  },
  pin_icon: {
    width: 124,
    height: 124,
    marginTop: 48,
    alignSelf: "center"
  },
  pin_percentage_wrapper: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row"
  },
  pin_percentage: {
    fontSize: 70,
    alignSelf: "flex-end",
    color: "black",
    fontFamily: "AvenirLTStd-Black"
  },
  pin_percentage_sign: {
    fontSize: 35,
    marginBottom: Platform.OS === "ios" ? 16 : 10,
    alignSelf: "flex-end",
    marginLeft: 3,
    fontFamily: "AvenirLTStd-Black"
  },
  pin_desc: {
    fontSize: 16,
    fontFamily: "Akkurat-Normal",
    color: "#333",
    lineHeight: 25,
    textAlign: "center",
    paddingLeft: 48,
    paddingRight: 48,
    marginTop: 16
  },
  pin_success: {
    fontSize: 14,
    fontFamily: "AvenirLTStd-Heavy",
    color: "#7dda06",
    marginLeft: 12,
    marginTop: Platform.OS === "ios" ? 4 : 0
  },
  pin_alert: {
    fontSize: 14,
    fontFamily: "AvenirLTStd-Heavy",
    color: "#f26522",
    marginLeft: 12,
    marginTop: Platform.OS === "ios" ? 4 : 0
  },
  pin_try_again: {
    color: "#f26522",
    fontFamily: "AvenirLTStd-Heavy",
    fontSize: 16,
    alignSelf: "center"
  },
  pin_alert_wrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderColor: "#f26522",
    backgroundColor: "#fee9df",
    width: "100%",
    padding: 12,
    position: "absolute",
    bottom: 0,
    borderRadius: 1,
    borderWidth: 1,
    marginBottom: 30
  },
  pin_success_wrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderColor: "#7dda06",
    backgroundColor: "#edf7e0",
    width: "100%",
    padding: 12,
    position: "absolute",
    bottom: 0,
    borderRadius: 1,
    borderWidth: 1,
    marginBottom: 30
  },
  alert_icon: {
    height: 24,
    width: 24
  },
  pin_field_wrapper: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 24
  },
  pin_field: {
    height: 48,
    width: 48,
    borderRadius: 2,
    borderWidth: 1,
    textAlign: "center",
    marginLeft: 6,
    marginRight: 6,
    fontSize: 35,
    paddingBottom: 4
  },
  hidden_input: {
    width: 240,
    height: 48,
    opacity: 0,
    position: "absolute",
    top: 0
  }
});

class PinScreen extends React.Component {
  constructor(props) {
    super(props);
    self = this;
  }
  static navigationOptions = {
    title: "CHANNEL 40",
    headerStyle: {
      backgroundColor: "white",
      elevation: 0,
      paddingLeft: 4
    },
    headerTitleStyle: {
      color: "#333",
      fontFamily: "Graystroke-Regular",
      fontWeight: "200",
      fontSize: 16,
      paddingLeft: 5,
      paddingTop: Platform.OS === "ios" ? 8 : 0
    }
  };
  state = {
    waiting: false,
    success: false,
    failed: false,
    pinExists: true,
    failed_message: "",
    percentage: new Animated.Value(0),
    focusedNumber: 0
  };
  render() {
    let bottomText = null;
    if (!(!this.state.pinExists && this.state.change)) {
      bottomText = (
        <Text
          style={styles.bottom_text}
          onPress={() => this.buttonTextClicked()}
        >
          <Text style={{ textDecorationLine: "underline" }}>
            {this.state.pinExists && !this.state.change
              ? "Forgot your pin?"
              : "Disable lock screen"}
          </Text>
        </Text>
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <View style={styles.content}>
          <Text style={styles.pin_title}>
            {this.state.change
              ? "Change your 4 digit pin for accessing the app."
              : this.state.pinExists
                ? "Use your fingerprint or a backup 4 digit pin to access the app."
                : "Enter a new 4 digit pin for accessing the app."}
          </Text>
          <View
            style={[
              styles.divider,
              { marginTop: Platform.OS === "ios" ? 48 : 16 }
            ]}
          />

          <Text style={styles.pin_subtitle}>YOUR SECRET PIN</Text>
          {Platform.OS === "android" ? (
            <Text style={styles.pin_desc}>
              {!this.state.pinExists || this.state.change
                ? "Enter a new 4 digit pin for accessing the account."
                : "Login using your 4 digit pin."}
            </Text>
          ) : null}
          <View style={styles.pin_field_wrapper}>
            <TextInput
              keyboardType="numeric"
              maxLength={4}
              autoFocus={true}
              style={styles.hidden_input}
              onChangeText={text => this.onChangeText(text)}
              value={this.state.pin}
            />

            <Text
              style={[
                styles.pin_field,
                {
                  borderColor:
                    this.state.focusedNumber == 0 ? "#f26522" : "#999999"
                }
              ]}
            >
              {this.state.pin && this.state.pin.length > 0 ? "•" : ""}
            </Text>
            <Text
              style={[
                styles.pin_field,
                {
                  borderColor:
                    this.state.focusedNumber == 1 ? "#f26522" : "#999999"
                }
              ]}
            >
              {this.state.pin && this.state.pin.length > 1 ? "•" : ""}
            </Text>
            <Text
              style={[
                styles.pin_field,
                {
                  borderColor:
                    this.state.focusedNumber == 2 ? "#f26522" : "#999999"
                }
              ]}
            >
              {this.state.pin && this.state.pin.length > 2 ? "•" : ""}
            </Text>
            <Text
              style={[
                styles.pin_field,
                {
                  borderColor:
                    this.state.focusedNumber == 3 ? "#f26522" : "#999999"
                }
              ]}
            >
              {this.state.pin && this.state.pin.length > 3 ? "•" : ""}
            </Text>
          </View>

          <View style={{ flex: 1 }}>{alert}</View>
        </View>
        <View style={styles.divider} />
        {bottomText}
      </View>
    );
  }

  buttonTextClicked() {
    if (this.state.pinExists && !this.state.change) {
      self.props.navigation.navigate("SignInScreen");
    } else {
      this.resetPin();
    }
  }

  async resetPin() {
    await AsyncStorage.removeItem("pin");
    this.authenticationSuccess();
  }

  get(obj, key) {
    return key.split(".").reduce(function(o, x) {
      return typeof o == "undefined" || o === null ? o : o[x];
    }, obj);
  }

  async retrievePin() {
    let pin = await AsyncStorage.getItem("pin");
    this.setState({ pinExists: pin !== null });
  }

  componentWillMount() {
    this.retrievePin();

    if (this.get(this.props, "navigation.state.params.change")) {
      this.setState({ change: true });
    }

    BackHandler.addEventListener(
      "hardwareBackPress",
      function() {
        self.props.navigation.dispatch({ type: "Navigation/BACK" });
        return true;
      }.bind(this)
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress");
  }

  onChangeText(text) {
    this.setState({ pin: text }, this.processText(text));
    this.updateFocus(text);
  }

  updateFocus(text) {
    if (!text || text.length == 0) {
      this.setState({ focusedNumber: 0 });
    } else if (text.length == 1) {
      this.setState({ focusedNumber: 1 });
    } else if (text.length == 2) {
      this.setState({ focusedNumber: 2 });
    } else if (text.length == 3) {
      this.setState({ focusedNumber: 3 });
    }
  }

  processText(text) {
    if (text.length == 4) {
      if (this.state.change || !this.state.pinExists) {
        this.savePin(text);
      } else {
        this.checkPin(text);
      }
    }
  }

  async checkPin(text) {
    let pin = await AsyncStorage.getItem("pin");
    if (pin == md5.hex_md5(text)) {
      this.authenticationSuccess();
    } else {
      this.authenticationFail();
    }
  }

  authenticationFail() {
    this.setState({
      pin: null
    });
    this.updateFocus();
  }

  authenticationSuccess() {
    Keyboard.dismiss();

    setTimeout(() => {
      self.resetNavigation("MainDrawer");
    }, 100);
  }

  resetNavigation = targetRoute => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: targetRoute })]
    });
    self.props.navigation.dispatch(resetAction);
  };

  async savePin(text) {
    await AsyncStorage.setItem("pin", md5.hex_md5(text));
    this.authenticationSuccess();
  }
}

export default PinScreen;
