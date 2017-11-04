import React from "react";
import { StackNavigator, NavigationActions } from "react-navigation";
import FindLoadsMapScreen from "./FindLoadsMapScreen";
import FindLoadsListScreen from "./FindLoadsListScreen";
import { Font } from "expo";

const FindLoadsScreen = StackNavigator(
  {
    FindLoadsMapScreen: { screen: FindLoadsMapScreen },
    FindLoadsListScreen: { screen: FindLoadsListScreen }
  },
  {
    headerMode: "none"
  }
);

export default FindLoadsScreen;
