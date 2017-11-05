import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  AsyncStorage,
  FlatList,
  Image
} from "react-native";
import Constants from "../../../util/Constants.js";
import Timestamp from "react-timestamp";
var axios = require("axios");
var currencyFormatter = require("currency-formatter");

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
    marginBottom: 4
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
    marginBottom: 2
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
    paddingRight: 16
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
    marginRight: 28,
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
    lineHeight: 12,
    paddingLeft: 1,
    fontFamily: "Graystroke-Regular",
    backgroundColor: "#f26522",
    width: 16,
    height: 16,
    borderRadius: 8,
    marginLeft: 8,
    color: "#fff",
    textAlign: "center",
    elevation: 2,
    alignSelf: "center"
  }
});

class FindLoadsListScreen extends React.Component {
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
                    <Text style={styles.job_title}>
                      {item.title.toUpperCase()}
                    </Text>
                    <Text style={styles.job_id}>Job ID: {item.id}</Text>
                  </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.job_price_wrapper}>
                  <Text style={styles.job_price_title}>YOU'LL RECEIVE</Text>
                  <Text style={styles.job_price}>
                    {currencyFormatter.format(item.price, { code: "AUD" })}
                  </Text>
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
                        {item.pick_point.address}
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
                        {item.drop_point.address}
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
                    <View>
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
  keyExtractor = (item, index) => item.id;

  /* Retrieves jobs from server. */
  async loadNearbyJobs() {
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
        this.displayJobs(response.data.RESPONSE.data);
      })
      .catch(function(error) {
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
