import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  TouchableHighlight,
  Image,
  StatusBar,
  Platform
} from "react-native";
import { MapView, Location, Constants, Permissions } from "expo";
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
    width: "100%"
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

  state = {
    location: null,
    errorMessage: null
  };
  /*render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#b3430e" />
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
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
*/

  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    let text = "Waiting..";
    var latitude2 = 0;
    var longitude2 = 0;
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      latitude2 = this.state.location.coords.latitude;
      longitude2 = this.state.location.coords.longitude;
    }
    console.log("render = "+latitude2);

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#b3430e" />
        <MapView
          style={styles.map}
          region={{
            latitude: latitude2,
            longitude: longitude2,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
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
