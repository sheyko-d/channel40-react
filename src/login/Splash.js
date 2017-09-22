import React from "react";
import { AppRegistry, Text, View } from "react-native";
import { StackNavigator } from "react-navigation";

class Splash extends React.Component {
  static navigationOptions = {
    title: 'Chat with Lucy'
  };
  render() {
    return (
      <View>
        <Text>Chat with Lucy</Text>
      </View>
    );
  }
}

export default Splash;
