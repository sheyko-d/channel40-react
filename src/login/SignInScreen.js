import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  WebView
} from "react-native";
import { StackNavigator, NavigationActions } from "react-navigation";

var WEBVIEW_REF = "webview";
var self;

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    self = this;
  }
  static navigationOptions = {
    title: "Splash",
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
        <WebView
          ref={WEBVIEW_REF}
          source={{
            uri:
              "http://10.0.2.2:8080/auth/realms/Channel%2040/protocol/openid-connect/auth?client_id=shoot-third-party&account_id=keycloak-token&redirect_uri=https%3A%2F%2Fdashboard.channel40.com.au%2Fdashboard&response_type=code"
          }}
          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest} //for iOS
          onNavigationStateChange={this.onShouldStartLoadWithRequest} //for Android
          startInLoadingState
          scalesPageToFit
          javaScriptEnabled
          style={{ flex: 1 }}
        />
    );
  }

  onShouldStartLoadWithRequest(navigator) {
    if (
      navigator.url.indexOf("https://dashboard.channel40.com.au/dashboard") ===
      -1
    ) {
      console.log("Don't close page = " + navigator.url);
      return true;
    } else {
      self.refs[WEBVIEW_REF].stopLoading(); //Some reference to your WebView to make it stop loading that URL

      console.log("Close page = " + navigator.url);
      self.resetNavigation("DriverHomeScreen");
      return false;
    }
  }

  resetNavigation = targetRoute => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: targetRoute })]
    });
    self.props.navigation.dispatch(resetAction);
  };
}

export default SignInScreen;
