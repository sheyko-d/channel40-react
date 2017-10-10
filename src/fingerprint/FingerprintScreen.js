import React from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import { StackNavigator, NavigationActions } from "react-navigation";

var WEBVIEW_REF = "webview";
var self;
const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: "white"
  }
});

class FingerprintScreen extends React.Component {
  static navigationOptions = {
    title: "CHANNEL 40",
    headerStyle: {
      backgroundColor: "white",
      elevation: 0,
      paddingLeft: 8
    },
    headerTitleStyle: {
      color: "#333",
      fontFamily: "Graystroke-Regular",
      fontWeight: "200",
      fontSize: 16
    }
  };
  state = {
    waiting: false
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text>
            Hold your finger on the home screen until the percentage reaches
            100%.
          </Text>
          <Text>
            {this.state.waiting
              ? "Waiting for fingerprint... "
              : "Authenticate with fingerprint"}
          </Text>
        </View>
      </View>
    );
  }

  componentDidMount() {
    this.authenticate();
  }

  async authenticate() {
    if (Platform.OS === "android") {
      this.setState({ waiting: true });
      try {
        let result = await Expo.Fingerprint.authenticateAsync();
        if (result.success) {
          alert("Authenticated!");
        } else {
          alert("Failed to authenticate = " + JSON.stringify(result));
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
