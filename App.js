import React from "react";
import { AppRegistry, Text, View, Button } from "react-native";
import { StackNavigator, NavigationActions } from "react-navigation";
import Splash from './src/login/Splash'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Welcome"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Hello, Chat App!</Text>
        <Button
          onPress={() => this.resetNavigation('Splash')}
          title="Chat with Lucy"
        />
      </View>
    );
  }

  resetNavigation = targetRoute => {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: targetRoute })]
        })
        this.props.navigation.dispatch(resetAction)
      }
}


const SimpleApp = StackNavigator(
  {
    Home: { screen: HomeScreen },
    Splash: { screen: Splash }
  }
);

export default SimpleApp;
