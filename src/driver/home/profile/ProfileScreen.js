import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo";
import Touchable from "react-native-touchable-safe";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 6
  },
  header: {
    alignItems: "center",
    paddingTop: 32
  },
  header_photo: {
    width: 96,
    height: 96
  },
  header_text: {
    fontSize: 10,
    fontFamily: "Graystroke-Regular",
    color: "#0000007f",
    marginTop: 12
  },
  header_name: {
    fontSize: 26,
    fontFamily: "Graystroke-Regular",
    color: "#363636",
    marginTop: 4
  },
  menu: {
    paddingLeft: 27,
    paddingRight: 27,
    marginTop: 20
  },
  menu_divider: {
    width: "100%",
    backgroundColor: "#e0e0e0",
    height: StyleSheet.hairlineWidth
  },
  menu_text: {
    fontSize: 20,
    color: "#999999",
    flex: 1,
    fontFamily: "Graystroke-Regular"
  },
  menu_item: {
    paddingLeft: 16,
    height: 48,
    alignItems: "center",
    flexDirection: "row"
  },
  menu_arrow: {
    width: 16,
    height: 16,
    tintColor: "#d5d6d7"
  }
});

class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Image
              style={styles.header_photo}
              borderRadius={48}
              source={{
                uri:
                  "https://lifeafterhavingalife.files.wordpress.com/2011/02/big-trucker.jpg"
              }}
            />
            <Text style={styles.header_text}>PROFILE ID 1</Text>
            <Text style={styles.header_name}>TESTER DRIVER</Text>
            <Text style={styles.header_text}>EDIT YOUR PROFILE</Text>
          </View>
          <View style={styles.menu}>
            <View style={styles.menu_divider} />
            <Touchable>
              <View style={styles.menu_item}>
                <Text style={styles.menu_text}>PERSONAL DETAILS</Text>
                <Image
                  style={styles.menu_arrow}
                  source={require("../../../../assets/icons/ic_right_arrow_circle_16dp.png")}
                />
              </View>
            </Touchable>
            <View style={styles.menu_divider} />
            <View style={styles.menu_item}>
              <Text style={styles.menu_text}>DOCUMENTS</Text>
              <Image
                style={styles.menu_arrow}
                source={require("../../../../assets/icons/ic_right_arrow_circle_16dp.png")}
              />
            </View>
            <View style={styles.menu_divider} />
            <View style={styles.menu_item}>
              <Text style={styles.menu_text}>LOAD TYPES</Text>
              <Image
                style={styles.menu_arrow}
                source={require("../../../../assets/icons/ic_right_arrow_circle_16dp.png")}
              />
            </View>
            <View style={styles.menu_divider} />
            <View style={styles.menu_item}>
              <Text style={styles.menu_text}>TRUCK SPECIFICATIONS</Text>
              <Image
                style={styles.menu_arrow}
                source={require("../../../../assets/icons/ic_right_arrow_circle_16dp.png")}
              />
            </View>
            <View style={styles.menu_divider} />
            <View style={styles.menu_item}>
              <Text style={styles.menu_text}>PASSWORD</Text>
              <Image
                style={styles.menu_arrow}
                source={require("../../../../assets/icons/ic_right_arrow_circle_16dp.png")}
              />
            </View>
            <View style={styles.menu_divider} />
            <View style={styles.menu_item}>
              <Text style={styles.menu_text}>PIN CODE</Text>
              <Image
                style={styles.menu_arrow}
                source={require("../../../../assets/icons/ic_right_arrow_circle_16dp.png")}
              />
            </View>
            <View style={styles.menu_divider} />
            <View style={styles.menu_item}>
              <Text style={styles.menu_text}>ACCOUNT DETAILS</Text>
              <Image
                style={styles.menu_arrow}
                source={require("../../../../assets/icons/ic_right_arrow_circle_16dp.png")}
              />
            </View>
            <View style={styles.menu_divider} />
          </View>
        </ScrollView>
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.1)"]}
          style={styles.gradient}
        />
      </View>
    );
  }
}

export default ProfileScreen;