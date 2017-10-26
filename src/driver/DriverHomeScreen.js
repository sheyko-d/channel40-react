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
  },
  top_bar: {
    backgroundColor: "#252525",
    height: 32,
    width: "100%",
    flexDirection: "row",
    alignItems: "center"
  },
  top_bar_text: {
    color: "#fff",
    fontFamily: "Graystroke-Regular",
    fontSize: 12,
    textAlign: "center"
  },
  top_bar_divider: {
    height: "100%",
    width: StyleSheet.hairlineWidth,
    backgroundColor: "#999999"
  },
  top_bar_button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  top_bar_nearby: {
    width: 11,
    height: 11,
    marginRight: 8
  },
  top_bar_general: {
    width: 10,
    height: 10,
    marginRight: 8,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginTop: 1
  },
  top_bar_express: {
    width: 10,
    height: 10,
    marginRight: 8,
    backgroundColor: "#f26522",
    borderRadius: 5,
    marginTop: 1
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
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#b3430e" />
        <View style={styles.top_bar}>
          <Text style={[styles.top_bar_text, { flex: 0.7 }]}>LOADS:</Text>
          <View style={styles.top_bar_divider} />
          <View style={styles.top_bar_button}>
            <Image
              style={styles.top_bar_nearby}
              source={require("../../assets/icons/nearby_icon.png")}
            />
            <Text style={styles.top_bar_text}>NEARBY</Text>
          </View>
          <View style={styles.top_bar_divider} />
          <View style={styles.top_bar_button}>
            <View style={styles.top_bar_express} />
            <Text style={styles.top_bar_text}>EXPRESS</Text>
          </View>
          <View style={styles.top_bar_divider} />
          <View style={styles.top_bar_button}>
            <View style={styles.top_bar_general} />
            <Text style={styles.top_bar_text}>GENERAL</Text>
          </View>
        </View>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0021
          }}
        />
      </View>
    );
  }
}

export default DriverHomeScreen;
