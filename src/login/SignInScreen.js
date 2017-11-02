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
import Constants from "../util/Constants.js";
var axios = require("axios");

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
    width: 270,
    paddingTop: 15,
    paddingBottom: 16,
    fontSize: 14,
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    color: "#FFF",
    fontFamily: "Graystroke-Regular",
    borderRadius: 2,
    elevation: 2,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 24
  },
  facebook_button: {
    backgroundColor: "#3b5998",
    marginTop: 16
  },
  forgot_password: {
    color: "#252525",
    fontSize: 14,
    fontFamily: "Akkurat-Normal",
    marginTop: 24,
    alignSelf: "center"
  }
});

class SignInScreen extends React.Component {
  state = {
    selectedUsername: true
  };
  constructor(props) {
    super(props);
    self = this;

    this.focusNextField = this.focusNextField.bind(this);
    this.inputs = {};
  }
  focusNextField(id) {
    console.log("focusNextField = " + id);
    this.inputs[id].focus();
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
            returnKeyType={"next"}
            style={[
              styles.text_input,
              {
                borderColor: this.state.selectedUsername ? "#333" : "#d5d6d7"
              }
            ]}
            onFocus={() => this.updateSelection(true)}
            underlineColorAndroid="rgba(0,0,0,0)"
            onSubmitEditing={() => {
              this.focusNextField("password");
            }}
            onChangeText={username => {
              this.setState({ username: username });
              this.validateFields(username, this.state.password);
            }}
          />
          <TextInput
            placeholder="Password"
            returnKeyType={"done"}
            secureTextEntry={true}
            style={[
              styles.text_input,
              {
                borderColor: !this.state.selectedUsername ? "#333" : "#d5d6d7"
              }
            ]}
            onFocus={() => this.updateSelection(false)}
            underlineColorAndroid="rgba(0,0,0,0)"
            ref={input => {
              this.inputs["password"] = input;
            }}
            onChangeText={password => {
              this.setState({ password: password });
              this.validateFields(this.state.username, password);
            }}
          />
          <Text
            style={[
              styles.button,
              {
                backgroundColor: this.state.fieldsValid ? "#F26522" : "#c7c7c7",
                elevation: this.state.fieldsValid ? 2 : 0
              }
            ]}
            onPress={() => this.login()}
          >
            SIGN IN TO YOUR ACCOUNT
          </Text>
          <Text
            style={[styles.button, styles.facebook_button]}
            onPress={() => this.signInFacebook()}
          >
            SIGN IN WITH FACEBOOK
          </Text>

          <Text
            style={styles.forgot_password}
            onPress={() => this.resetNavigation("PinScreen")}
          >
            Forgot your password?&nbsp;
            <Text style={{ textDecorationLine: "underline" }}>
              Send a reset link
            </Text>
          </Text>
        </View>
      </View>
    );
  }

  login() {
    if (!this.state.fieldsValid) return;

    let formdata = new FormData();
    formdata.append("user_name", this.state.username);
    formdata.append("password", this.state.password);
    formdata.append("source", "react_native");

    // Send a POST request
    axios({
      method: "post",
      url: Constants.BASE_URL + "/user/login",
      data: formdata
    }).then(response => {
      console.log(JSON.stringify(response.data));
      //alert(JSON.stringify(response._bodyInit.response.api_token));
    });
  }

  validateFields(username, password) {
    this.setState({
      fieldsValid: username && password
    });
  }

  updateSelection(selected) {
    this.setState({ selectedUsername: selected });
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
