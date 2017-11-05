import React from "react";
import Touchable from "react-native-touchable-safe";
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  StatusBar,
  Platform,
  AsyncStorage,
  Alert
} from "react-native";
import { MapView, Location, Permissions, LinearGradient } from "expo";
import { StackNavigator, TabNavigator } from "react-navigation";
import Constants from "../../../util/Constants.js";
var axios = require("axios");

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
    backgroundColor: "#f7f3ef",
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
    alignItems: "center",
    elevation: 4
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
  top_bar_wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: "100%"
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
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 6
  }
});

class FindLoadsMapScreen extends React.Component {
  state = {
    errorMessage: null,
    region: {
      latitude: -24.25,
      longitude: 133.916667,
      latitudeDelta: 45,
      longitudeDelta: 0
    }
  };

  /* Retrieves jobs from server. */
  async loadNearbyJobs() {
    let api_token = await AsyncStorage.getItem("api_token");
    axios({
      method: "get",
      url:
        Constants.BASE_URL +
        "/freight/nearby?lat=" +
        this.state.region.latitude +
        "&lng=" +
        this.state.region.longitude +
        "&count=50",
      headers: { Authorization: "Token " + api_token }
    })
      .then(response => {
        this.displayMarkers(response.data.RESPONSE.data);
      })
      .catch(function(error) {
        if (error.response) {
          Alert.alert("Server Error", JSON.stringify(error.response.data));
        } else {
          console.log("Server error: " + error);
        }
      });
  }

  displayMarkers(jobs) {
    this.setState({ jobs: jobs });
  }

  componentDidMount() {
    this.props.navigation.navigate("FindLoadsListScreen");
    
    this.updateLocation();

    let that = this;
    setTimeout(function() {
      that.forceUpdate();
    }, 1000);
  }

  async updateLocation() {
    let latitude = await AsyncStorage.getItem("latitude");
    let longitude = await AsyncStorage.getItem("longitude");
    latitude = JSON.parse(latitude);
    longitude = JSON.parse(longitude);
    if (latitude !== null) {
      this.setState(
        {
          region: {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 3.5,
            longitudeDelta: 0
          }
        },
        () => this.loadNearbyJobs()
      );
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

      this.setState(
        {
          region: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 3.5,
            longitudeDelta: 0
          }
        },
        () => this.loadNearbyJobs()
      );
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
          <Touchable
            outerStyle={styles.top_bar_wrapper}
            onPress={() => this.openNearbyScreen()}
            nativePressColor="rgba(255,255,255,.3)"
          >
            <View style={styles.top_bar_wrapper}>
              <Image
                style={styles.top_bar_nearby}
                source={require("../../../../assets/icons/nearby_icon.png")}
              />
              <Text style={styles.top_bar_text}>NEARBY</Text>
            </View>
          </Touchable>
          <View style={styles.top_bar_divider} />
          <Touchable
            outerStyle={styles.top_bar_wrapper}
            onPress={() => this.openExpressScreen()}
            nativePressColor="rgba(255,255,255,.3)"
          >
            <View style={styles.top_bar_wrapper}>
              <View style={styles.top_bar_express} />
              <Text style={styles.top_bar_text}>EXPRESS</Text>
            </View>
          </Touchable>
          <View style={styles.top_bar_divider} />
          <Touchable
            outerStyle={styles.top_bar_wrapper}
            onPress={() => this.openGeneralScreen()}
            nativePressColor="rgba(255,255,255,.3)"
          >
            <View style={styles.top_bar_wrapper}>
              <View style={styles.top_bar_general} />
              <Text style={styles.top_bar_text}>GENERAL</Text>
            </View>
          </Touchable>
        </View>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          region={this.state.region}
        >
          {this.state.jobs
            ? this.state.jobs.map(
                job =>
                  job.pick_point.lat && parseFloat(job.pick_point.lat) ? (
                    <MapView.Marker
                      key={job.id}
                      coordinate={{
                        latitude: parseFloat(job.pick_point.lat),
                        longitude: parseFloat(job.pick_point.lng)
                      }}
                      image={require("../../../../assets/icons/marker.png")}
                      title={job.title}
                    />
                  ) : null
              )
            : null}
        </MapView>
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.1)"]}
          style={styles.gradient}
        />
      </View>
    );
  }

  openNearbyScreen() {
    this.props.navigation.navigate("FindLoadsListScreen");
  }

  openExpressScreen() {}

  openGeneralScreen() {}
}

export default FindLoadsMapScreen;
