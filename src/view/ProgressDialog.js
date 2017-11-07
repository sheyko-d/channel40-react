import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  AsyncStorage,
  StatusBar
} from "react-native";
import { LinearGradient } from "expo";
import Touchable from "react-native-touchable-safe";
import { NavigationActions } from "react-navigation";
import * as Progress from "react-native-progress";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000055",
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0
  },
  loading: {
    padding: 30,
    color: "#d5d6d7",
    fontSize: 16,
    fontFamily: "AvenirLTStd-Medium"
  }
});

class ProgressDialog extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#82310b" barStyle="light-content" />
        <Progress.CircleSnail
          size={80}
          thickness={6}
          color={"#f26522"}
        />
        <Text style={styles.loading}>Loading…</Text>
      </View>
    );
  }
}

export default ProgressDialog;
