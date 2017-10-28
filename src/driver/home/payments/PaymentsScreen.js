import React from "react";
import { StyleSheet, Text, View } from "react-native";

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

class PaymentsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder_wrapper}>
          <Text style={styles.placeholder}>NO COMPLETED{"\n"}LOADS FOUND.</Text>
        </View>
      </View>
    );
  }
}

export default PaymentsScreen;
