import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#363636",
    flex: 1
  },
  placeholder_wrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  placeholder: {
    color: "#fff",
    fontSize: 32,
    lineHeight: 56,
    fontFamily: "Graystroke-Regular",
    textAlign: "center"
  }
});

class FindLoadsListScreen extends React.Component {
  static navigationOptions = {
    title: "CHANNEL 40",
    headerStyle: {
      backgroundColor: "#f26522"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      color: "white",
      alignSelf: "center",
      fontFamily: "Graystroke-Regular",
      fontWeight: "200",
      fontSize: 16,
      paddingRight: Platform.OS === "ios" ? 0 : 40,
      paddingTop: Platform.OS === "ios" ? 8 : 0
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder_wrapper}>
          <Text style={styles.placeholder}>NO JOBS FOUND.</Text>
        </View>
      </View>
    );
  }
}

export default FindLoadsListScreen;
