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
  WebView,
  TextInput,
  Platform
} from "react-native";
import { StackNavigator, NavigationActions } from "react-navigation";

var WEBVIEW_REF = "webview";
var self;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  },
  content: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 48,
    flex: 1
  },
  text_input: {
    paddingLeft: 16,
    paddingRight: 16,
    height: 48,
    marginBottom: 16,
    fontSize: 16,
    borderColor: "#d5d6d7",
    borderRadius: 3,
    color: "#333",
    borderWidth: StyleSheet.hairlineWidth
  },
  divider: {
    backgroundColor: "#e0e0e0",
    height: StyleSheet.hairlineWidth,
    width: "100%"
  },
  button: {
    width: 260,
    paddingTop: 15,
    paddingBottom: 16,
    fontSize: 14,
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F26522",
    color: "#FFF",
    fontFamily: "Graystroke-Regular",
    borderRadius: 2,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 24,
    elevation: 2
  },
  facebook_button: {
    backgroundColor: "#3b5998",
    marginTop: 16
  }
});

class SignInScreen extends React.Component {
  state = {
    selectedUsername: true
  };
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
      fontSize: 16,
      paddingTop: Platform.OS === "ios" ? 8 : 0
    }
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.divider} />
        <View style={styles.content}>
          <TextInput
            placeholder="Username"
            style={[
              styles.text_input,
              {
                borderColor: this.state.selectedUsername ? "#333" : "#d5d6d7"
              }
            ]}
            onFocus={() => this.updateSelection(true)}
            underlineColorAndroid="rgba(0,0,0,0)"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            style={[
              styles.text_input,
              {
                borderColor: !this.state.selectedUsername ? "#333" : "#d5d6d7"
              }
            ]}
            onFocus={() => this.updateSelection(false)}
            underlineColorAndroid="rgba(0,0,0,0)"
          />
          <Text style={styles.button} onPress={() => this.login()}>
            SIGN IN TO YOUR ACCOUNT
          </Text>
          <Text
            style={[styles.button, styles.facebook_button]}
            onPress={() => this.signInFacebook()}
          >
            SIGN IN WITH FACEBOOK
          </Text>
        </View>
      </View>
    );
  }

  updateSelection(selected){
    this.setState({selectedUsername: selected});
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
