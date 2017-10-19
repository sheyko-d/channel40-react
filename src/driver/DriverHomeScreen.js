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
  Platform,
  AsyncStorage
} from "react-native";
import { MapView, Location, Constants, Permissions } from "expo";
import { StackNavigator, TabNavigator } from "react-navigation";

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
  state = {
    latitude: null,
    longitude: null,
    errorMessage: null
  };

  componentWillMount() {
    this.updateLocation();
  }

  async updateLocation() {
    let latitude = await AsyncStorage.getItem("latitude");
    let longitude = await AsyncStorage.getItem("longitude");
    latitude = JSON.parse(latitude);
    longitude = JSON.parse(longitude);
    if (latitude !== null) {
      this.setState({ latitude: latitude, longitude: longitude });
    }

    this._getLocationAsync({ enableHighAccuracy: true });
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    } else {
      let location = await Location.getCurrentPositionAsync({});

      await AsyncStorage.setItem(
        "latitude",
        JSON.stringify(location.coords.latitude)
      );
      await AsyncStorage.setItem(
        "longitude",
        JSON.stringify(location.coords.longitude)
      );
      this.setState({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    }
  };

  render() {
    let text = "Waiting..";
    var latitude = 0;
    var longitude = 0;
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.latitude !== null) {
      latitude = this.state.latitude;
      longitude = this.state.longitude;
    }
    <MapView
      style={styles.map}
      showsUserLocation={true}
      region={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0021
      }}
    />;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#b3430e" />
      </View>
    );
  }
}

export default DriverHomeScreen;
