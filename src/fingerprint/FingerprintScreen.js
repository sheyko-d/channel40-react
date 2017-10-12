import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  StatusBar,
  Image,
  Animated
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
  fingerprint_title: {
    fontSize: 16,
    fontFamily: "Akkurat-Normal",
    color: "#333",
    lineHeight: 25,
    marginTop: -8
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
  fingerprint_icon: {
    width: 124,
    height: 124,
    marginTop: 48,
    alignSelf: "center"
  },
  fingerprint_percentage_wrapper: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row"
  },
  fingerprint_percentage: {
    fontSize: 70,
    alignSelf: "flex-end",
    color: "black",
    fontFamily: "AvenirLTStd-Black"
  },
  fingerprint_percentage_sign: {
    fontSize: 35,
    marginBottom: 8,
    alignSelf: "flex-end",
    marginLeft: 3,
    fontFamily: "AvenirLTStd-Black"
  },
  fingerprint_desc: {
    fontSize: 16,
    fontFamily: "Akkurat-Normal",
    color: "#333",
    lineHeight: 25,
    textAlign: "center",
    paddingLeft: 48,
    paddingRight: 48,
    marginTop: 16
  },
  fingerprint_success: {
    fontSize: 14,
    fontFamily: "AvenirLTStd-Heavy",
    color: "#7dda06",
    marginLeft: 12
  },
  fingerprint_alert: {
    fontSize: 14,
    fontFamily: "AvenirLTStd-Heavy",
    color: "#f26522",
    marginLeft: 12
  },
  fingerprint_alert_wrapper: {
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
  fingerprint_success_wrapper: {
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
  }
});

class FingerprintScreen extends React.Component {
  constructor(props) {
    super(props);
    self = this;
  }
  static navigationOptions = {
    title: "CHANNEL 40",
    headerStyle: {
      backgroundColor: "white",
      elevation: 0,
      paddingLeft: 10
    },
    headerTitleStyle: {
      color: "#333",
      fontFamily: "Graystroke-Regular",
      fontWeight: "200",
      fontSize: 16
    }
  };
  state = {
    waiting: false,
    success: false,
    failed: false,
    failed_message: "",
    percentage: new Animated.Value(0)
  };
  render() {
    let alert = null;
    if (this.state.success || this.state.failed) {
      alert = (
        <View
          style={
            this.state.success
              ? styles.fingerprint_success_wrapper
              : styles.fingerprint_alert_wrapper
          }
        >
          <Image
            style={styles.alert_icon}
            source={
              this.state.success
                ? require("../../assets/icons/auth_success.png")
                : require("../../assets/icons/auth_error.png")
            }
          />
          <Text
            style={
              this.state.success
                ? styles.fingerprint_success
                : styles.fingerprint_alert
            }
          >
            {" "}
            {this.state.success
              ? "Success, your fingerprint is recognised."
              : this.state.failed_message == null
                ? "Error recognizing fingerprint."
                : this.state.failed_message}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <View style={styles.content}>
          <Text style={styles.fingerprint_title}>
            Use your fingerprint or a backup 4 digit pin to access the app.
          </Text>
          <View style={[styles.divider, { marginTop: 16 }]} />
          <Image
            style={styles.fingerprint_icon}
            source={require("../../assets/icons/fingerprint.png")}
          />
          <View style={styles.fingerprint_percentage_wrapper}>
            <Text style={styles.fingerprint_percentage}>
              {Math.round(JSON.stringify(this.state.percentage))}
            </Text>
            <Text style={styles.fingerprint_percentage_sign}>%</Text>
          </View>
          <Text style={styles.fingerprint_desc}>
            Hold your finger on the home screen until the percentage reaches
            100%.
          </Text>
          <View style={{ flex: 1 }}>{alert}</View>
        </View>
        <View style={styles.divider} />
        <Text style={styles.bottom_text}>
          Doesn't work?&nbsp;
          <Text style={{ textDecorationLine: "underline" }}>Enter pin</Text>
        </Text>
      </View>
    );
  }

  componentDidMount() {
    this.authenticate();
  }

  authenticationSuccess() {
    // Show the success alert
    this.setState({ success: true });

    // Animate the percentage text
    Animated.timing(this.state.percentage, {
      toValue: 100,
      duration: 500
    }).start();
    this.state.percentage.addListener(({ value }) =>
      this.setState({ percentage: value })
    );

    setTimeout(function() {
      self.resetNavigation("MainDrawer");
    }, 750);
  }

  resetNavigation = targetRoute => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: targetRoute })]
    });
    self.props.navigation.dispatch(resetAction);
  };

  authenticationFail(message) {
    this.setState({
      failed: true,
      failed_message: message
    });
  }

  async authenticate() {
    if (Platform.OS === "android") {
      this.setState({ waiting: true });
      try {
        let result = await Expo.Fingerprint.authenticateAsync();
        if (result.success) {
          this.authenticationSuccess();
        } else {
          console.log(JSON.stringify(result));
          this.authenticationFail(result.message);
          if (
            result.error == "authentication_failed" ||
            result.error == "user_cancel"
          ) {
            this.authenticate();
          }
        }
      } finally {
        this.setState({ waiting: false });
      }
    } else if (Platform.OS === "ios") {
      let result = await Expo.Fingerprint.authenticateAsync(
        "Show me your finger!"
      );
      if (result.success) {
        alert("Success!");
      } else {
        alert("Cancel!");
      }
    }
  }
}

export default FingerprintScreen;
