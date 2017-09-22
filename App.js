import React from "react";
import { AppRegistry, Text, View, Button, Image, StyleSheet } from "react-native";
import { StackNavigator, NavigationActions } from "react-navigation";
import Splash from "./src/login/Splash";

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
  }
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Welcome",
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Image
          style={styles.logo_background}
          source={require("./assets/icons/loading.png")}
        >
          <View style={styles.logo_wrapper}>
            <Image
              style={styles.logo_image}
              fadeDuration={0}
              source={require("./assets/icons/app_logo.png")}
            />
            <Button onPress={() => this.resetNavigation("Splash")} title="Press Me" />
            <Text style={{ color: "#FFF" }}>
              Moving loads accross Australia.
            </Text>
          </View>
        </Image>
      </View>
    );
  }

  resetNavigation = targetRoute => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: targetRoute })]
    });
    this.props.navigation.dispatch(resetAction);
  };
}

const SimpleApp = StackNavigator(
  {
    Home: { screen: HomeScreen },
    Splash: { screen: Splash }
  },
  {
    headerMode: "screen"
  }
);

export default SimpleApp;
