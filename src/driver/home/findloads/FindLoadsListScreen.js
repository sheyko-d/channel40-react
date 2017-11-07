import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  AsyncStorage,
  FlatList,
  Image,
  Alert
} from "react-native";
import Constants from "../../../util/Constants.js";
import ProgressDialog from "../../../view/ProgressDialog.js";
import Timestamp from "react-timestamp";
var axios = require("axios");
var currencyFormatter = require("currency-formatter");
import { Manager as ModalManager } from "react-native-root-modal";

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
  },
  job_title: {
    color: "#252525",
    fontSize: 20,
    fontFamily: "Graystroke-Regular",
    marginBottom: 4,
    lineHeight: 32,
    marginTop: -6
  },
  job_id: {
    color: "#999999",
    fontSize: 12,
    fontFamily: "Akkurat-Normal"
  },
  job_header_wrapper: {
    paddingLeft: 12,
    paddingRight: 24,
    flexDirection: "row",
    paddingTop: 16
  },
  job_title_wrapper: {
    alignSelf: "center",
    marginBottom: 2,
    flex: 1
  },
  job_wrapper: {
    backgroundColor: "#fff",
    borderRadius: 2,
    margin: 15,
    elevation: 4
  },
  job_photo: {
    width: 56,
    height: 56,
    marginRight: 15,
    alignSelf: "center"
  },
  divider: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#e0e0e0",
    marginTop: 12,
    marginBottom: 12
  },
  job_price_wrapper: {
    paddingLeft: 81,
    paddingRight: 16,
    flexDirection: "row"
  },
  job_price_title: {
    color: "#73b322",
    fontSize: 12,
    fontFamily: "Graystroke-Regular"
  },
  job_price: {
    color: "#111",
    fontSize: 20,
    fontFamily: "Graystroke-Regular"
  },
  job_icon: {
    height: 36,
    marginRight: 32,
    tintColor: "#252525"
  },
  job_detail_wrapper: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 6
  },
  job_detail_title: {
    color: "#999999",
    fontSize: 10,
    marginLeft: 2,
    fontFamily: "Graystroke-Regular",
    marginBottom: 6
  },
  job_details: {
    color: "#252525",
    fontSize: 16,
    fontFamily: "Akkurat-Normal"
  },
  job_action_wrapper: {
    flex: 1,
    flexDirection: "row"
  },
  job_action: {
    flex: 2,
    paddingTop: 24,
    paddingBottom: 24,
    textAlign: "center",
    fontFamily: "Graystroke-Regular",
    fontSize: 15,
    color: "#111"
  },
  job_negotiate_counter: {
    fontSize: 10,
    lineHeight: 12.5,
    paddingLeft: 2,
    fontFamily: "Graystroke-Regular",
    backgroundColor: "#73b322",
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: 8,
    color: "#fff",
    textAlign: "center",
    elevation: 2,
    marginTop: 1.5,
    alignSelf: "center"
  },
  job_gst: {
    color: "#999999",
    fontSize: 16,
    fontFamily: "Akkurat-Normal",
    marginBottom: 1,
    marginTop: -12,
    marginLeft: 10,
    lineHeight: 30.5,
    flex: 1
  },
  job_info_icon: {
    height: 24,
    width: 24,
    alignSelf: "center"
  },
  job_info: {
    fontSize: 16,
    color: "#999999",
    fontFamily: "Akkurat-Normal",
    alignSelf: "center",
    marginLeft: 4,
    marginRight: 8
  }
});

class FindLoadsListScreen extends React.Component {
  modal = null;
  state = {};

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

  componentWillMount() {
    this.loadNearbyJobs();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.jobs ? (
          <FlatList
            data={this.state.jobs}
            renderItem={({ item }) => (
              <View style={styles.job_wrapper}>
                <View style={styles.job_header_wrapper}>
                  <Image
                    style={styles.job_photo}
                    borderRadius={28}
                    source={
                      item.photos.length > 0
                        ? {
                            uri: item.photos[0].path
                          }
                        : require("../../../../assets/icons/ic_empty_box.png")
                    }
                  />
                  <View style={styles.job_title_wrapper}>
                    <Text style={styles.job_title} numberOfLines={2}>
                      {item.title.toUpperCase()}
                    </Text>
                    <Text style={styles.job_id}>Job ID: {item.id}</Text>
                  </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.job_price_wrapper}>
                  <View>
                    <Text style={styles.job_price_title}>YOU'LL RECEIVE</Text>
                    <Text style={styles.job_price}>
                      {item.price !== 0
                        ? currencyFormatter.format(item.price, { code: "AUD" })
                        : "NEGOTIABLE"}
                    </Text>
                  </View>
                  {item.price !== 0 ? (
                    <Text style={styles.job_gst}>
                      including{"\n"}
                      {currencyFormatter.format(item.price / 10, {
                        code: "AUD"
                      })}{" "}
                      GST
                    </Text>
                  ) : (
                    <View style={{ flex: 1 }} />
                  )}
                  <Image
                    style={styles.job_info_icon}
                    source={require("../../../../assets/icons/fees_info.png")}
                  />
                  <Text style={styles.job_info}>fees</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.job_detail_wrapper}>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      style={styles.job_icon}
                      width={22}
                      resizeMode={"contain"}
                      source={require("../../../../assets/icons/marker_transparent.png")}
                    />
                    <View>
                      <Text style={styles.job_detail_title}>
                        PICK UP ADDRESS
                      </Text>
                      <Text style={styles.job_details}>
                        {item.pick_point.suburb},{" "}
                        {this.shortenState(item.pick_point.state)}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 16
                    }}
                  >
                    <Image
                      style={styles.job_icon}
                      width={22}
                      resizeMode={"contain"}
                      source={require("../../../../assets/icons/marker_transparent.png")}
                    />
                    <View>
                      <Text style={styles.job_detail_title}>
                        DROP OFF ADDRESS
                      </Text>
                      <Text style={styles.job_details}>
                        {item.drop_point.suburb},{" "}
                        {this.shortenState(item.drop_point.state)}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 16
                    }}
                  >
                    <Image
                      style={styles.job_icon}
                      width={24}
                      resizeMode={"contain"}
                      source={require("../../../../assets/icons/pickup_date.png")}
                    />
                    <View style={{ marginLeft: -2 }}>
                      <Text style={styles.job_detail_title}>
                        AVAILABLE FOR PICKUP FROM
                      </Text>
                      <Timestamp
                        style={styles.job_details}
                        time={item.pick_date}
                        component={Text}
                        format="full"
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={[styles.divider, { marginTop: 16, marginBottom: 0 }]}
                />
                <View style={styles.job_action_wrapper}>
                  <Text style={styles.job_action}>ACCEPT</Text>
                  <Text style={styles.job_action}>DECLINE</Text>
                  <View
                    style={{
                      flex: 3,
                      flexDirection: "row",
                      justifyContent: "center"
                    }}
                  >
                    <Text style={[styles.job_action, { flex: null }]}>
                      NEGOTIATE
                    </Text>
                    <Text style={styles.job_negotiate_counter}>+</Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={this.keyExtractor}
          />
        ) : //<View style={styles.placeholder_wrapper}>
        //  <Text style={styles.placeholder}>NO JOBS FOUND.</Text>
        //</View>
        null}
      </View>
    );
  }

  shortenState(state) {
    stateLower = state.toLowerCase();

    switch (stateLower) {
      case "new south wales":
        return "NSW";
      case "northern territory":
        return "NT";
      case "queensland":
        return "QLD";
      case "south australia":
        return "SA";
      case "tasmania":
        return "TAS";
      case "victoria":
        return "VIC";
      case "western australia":
        return "WA";
      default:
        return state;
    }
  }

  keyExtractor = (item, index) => item.id;

  /* Retrieves jobs from server. */
  async loadNearbyJobs() {
    // Create a Modal element on screen.
    modal = new ModalManager(<ProgressDialog />);

    let api_token = await AsyncStorage.getItem("api_token");
    let latitude = await AsyncStorage.getItem("latitude");
    let longitude = await AsyncStorage.getItem("longitude");
    axios({
      method: "get",
      url:
        Constants.BASE_URL +
        "/freight/nearby?lat=" +
        latitude +
        "&lng=" +
        longitude +
        "&count=50",
      headers: { Authorization: "Token " + api_token }
    })
      .then(response => {
        modal.destroy();
        
        this.displayJobs(response.data.RESPONSE.data);
        //console.log(response.data.RESPONSE.data);
      })
      .catch(function(error) {
        modal.destroy();

        if (error.response) {
          Alert.alert("Server Error", JSON.stringify(error.response.data));
        } else {
          console.log("Server error: " + error);
        }
      });
  }

  displayJobs(jobs) {
    this.setState({ jobs: jobs });
  }
}

export default FindLoadsListScreen;
