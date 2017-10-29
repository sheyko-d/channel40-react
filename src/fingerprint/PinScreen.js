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
    marginTop: 48
  },
  pin_field: {
    height: 48,
    width: 48,
    borderRadius: 2,
    borderWidth: 1,
    textAlign: "center",
    marginLeft: 6,
    marginRight: 6,
    fontSize: 30
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
    fieldNumber: 0
  };
  render() {
    let alert = null;
    if (this.state.success || this.state.failed) {
      alert = (
        <View
          style={
            this.state.success
              ? styles.pin_success_wrapper
              : styles.pin_alert_wrapper
          }
        >
          <Text
            style={this.state.success ? styles.pin_success : styles.pin_alert}
          >
            {" "}
            {this.state.success
              ? "Success, your pin is recognised."
              : this.state.failed_message == null
                ? "Error recognizing pin."
                : this.state.failed_message}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <View style={styles.content}>
          <Text style={styles.pin_title}>
            {this.state.pinExists
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
              {this.state.pinExists
                ? "Login using your 4 digit pin."
                : "Enter a new 4 digit pin for accessing the account."}
            </Text>
          ) : null}
          <View style={styles.pin_field_wrapper}>
            <TextInput
              ref="0"
              keyboardType="numeric"
              autoFocus={true}
              secureTextEntry={true}
              maxLength={1}
              style={[
                styles.pin_field,
                {
                  borderColor:
                    this.state.fieldNumber == 0 ? "#f26522" : "#999999"
                }
              ]}
              underlineColorAndroid="rgba(0,0,0,0)"
              selectionColor={"white"}
              onFocus={() => this.onFocus(0)}
              onChangeText={text => this.onChangeText(text, 0)}
            />
            <TextInput
              ref="1"
              keyboardType="numeric"
              secureTextEntry={true}
              maxLength={1}
              style={[
                styles.pin_field,
                {
                  borderColor:
                    this.state.fieldNumber == 1 ? "#f26522" : "#999999"
                }
              ]}
              underlineColorAndroid="rgba(0,0,0,0)"
              selectionColor={"white"}
              onFocus={() => this.onFocus(1)}
              onChangeText={text => this.onChangeText(text, 1)}
            />
            <TextInput
              ref="2"
              keyboardType="numeric"
              secureTextEntry={true}
              maxLength={1}
              style={[
                styles.pin_field,
                {
                  borderColor:
                    this.state.fieldNumber == 2 ? "#f26522" : "#999999"
                }
              ]}
              underlineColorAndroid="rgba(0,0,0,0)"
              selectionColor={"white"}
              onFocus={() => this.onFocus(2)}
              onChangeText={text => this.onChangeText(text, 2)}
            />
            <TextInput
              ref="3"
              keyboardType="numeric"
              secureTextEntry={true}
              maxLength={1}
              style={[
                styles.pin_field,
                {
                  borderColor:
                    this.state.fieldNumber == 3 ? "#f26522" : "#999999"
                }
              ]}
              underlineColorAndroid="rgba(0,0,0,0)"
              selectionColor={"white"}
              onFocus={() => this.onFocus(3)}
              onChangeText={text => this.onChangeText(text, 3)}
            />
          </View>

          <View style={{ flex: 1 }}>{alert}</View>
        </View>
        <View style={styles.divider} />
        <Text style={styles.bottom_text}>
          <Text style={{ textDecorationLine: "underline" }}>
            {this.state.pinExists ? "Forgot your pin?" : "Disable lock screen"}
          </Text>
        </Text>
      </View>
    );
  }

  async retrievePin() {
    let pin = await AsyncStorage.getItem("pin");
    this.setState({ pinExists: pin !== null });
  }

  componentWillMount() {
    this.retrievePin();

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

  onChangeText(text, fieldNumber) {
    if (fieldNumber < 3) {
      if (text.length > 0) {
        this.onFocus(fieldNumber + 1);
      }
    } else {
      this.savePin();
      this.resetNavigation("MainDrawer");
    }
  }

  resetNavigation = targetRoute => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: targetRoute })]
    });
    self.props.navigation.dispatch(resetAction);
  };

  onFocus(fieldNumber) {
    this.setState({
      fieldNumber: fieldNumber
    });
    this.refs[fieldNumber].focus();
  }

  async savePin() {
    await AsyncStorage.setItem("pin", "0000");
  }
}

export default PinScreen;
