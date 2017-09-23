import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  TouchableHighlight,
  Image,
  StatusBar
} from "react-native";
import { StackNavigator } from "react-navigation";

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
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  map: {
    flex: 1,
    backgroundColor: "#ccc",
    width: "100%",
    padding: 15
  },
  bottom_tabs: {
    flexDirection: "row",
    width: "100%",
    height: 80
  },
  tab_column: {
    flex: 1,
    height: 80,
    alignItems: "center",
    justifyContent: "center"
  },
  tab_icon: {
    alignSelf: "center",
    width: 28,
    height: 28,
    marginBottom: 8,
    resizeMode: "contain",
    tintColor: "#f26522"
  },
  tab_title: {
    fontSize: 9,
    color: "#f26522",
    fontWeight: "bold"
  }
});

class DriverHomeScreen extends React.Component {
  static navigationOptions = {
    title: "Channel40",
    headerStyle: {
      backgroundColor: "#f26522"
    },
    headerTitleStyle: { color: "white" }
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#b3430e" />
        <View style={styles.map}>
          <Text>Map</Text>
        </View>
        <View style={styles.bottom_tabs}>
          <TouchableHighlight
            style={styles.tab_column}
            onPress={() => navigate("SecondScreen")}
          >
            <View>
              <Image
                style={styles.tab_icon}
                source={require("../../assets/icons/ic_home.png")}
              />
              <Text style={styles.tab_title}>HOME</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.tab_column}
            onPress={() => navigate("SecondScreen")}
          >
            <View>
              <Image
                style={styles.tab_icon}
                source={require("../../assets/icons/ic_message.png")}
              />
              <Text style={styles.tab_title}>MESSAGES</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.tab_column}
            onPress={() => navigate("SecondScreen")}
          >
            <View>
              <Image
                style={styles.tab_icon}
                source={require("../../assets/icons/ic_history.png")}
              />
              <Text style={styles.tab_title}>MY JOBS</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.tab_column}
            onPress={() => navigate("SecondScreen")}
          >
            <View>
              <Image
                style={styles.tab_icon}
                source={require("../../assets/icons/ic_payment.png")}
              />
              <Text style={styles.tab_title}>PAYMENTS</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.tab_column}
            onPress={() => navigate("SecondScreen")}
          >
            <View>
              <Image
                style={styles.tab_icon}
                source={require("../../assets/icons/ic_profile.png")}
              />
              <Text style={styles.tab_title}>SETTINGS</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default DriverHomeScreen;
