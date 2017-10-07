import React from "react";
import { StyleSheet, Button, ScrollView, Text, Image } from "react-native";
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
    marginTop: 8,
    resizeMode: "contain",
    tintColor: "#f26522"
  },
  tab_title: {
    fontSize: 9,
    color: "#f26522",
    fontWeight: "bold"
  }
});

const MyNavScreen = ({ navigation, banner }) => (
  <ScrollView>
    <Text style={{ margin: 14 }}>{banner}</Text>
  </ScrollView>
);

const HomeScreen = ({ navigation }) => (
  <MyNavScreen banner="Home Screen" navigation={navigation} />
);

const MessagesScreen = ({ navigation }) => (
  <MyNavScreen banner="Messages Screen" navigation={navigation} />
);

const MyJobsScreen = ({ navigation }) => (
  <MyNavScreen banner="My Jobs Screen" navigation={navigation} />
);

const PaymentsScreen = ({ navigation }) => (
  <MyNavScreen banner="Payments Screen" navigation={navigation} />
);

const ProfileScreen = ({ navigation }) => (
  <MyNavScreen banner="Profile Screen" navigation={navigation} />
);

const SimpleTabs = TabNavigator(
  {
    MainTab: {
      screen: HomeScreen,
      path: "/",
      navigationOptions: {
        title: "Welcome",
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={styles.tab_icon}
            source={require("../../assets/icons/ic_home.png")}
          />
        )
      }
    },
    MessagesTab: {
      screen: MessagesScreen,
      path: "/profile",
      navigationOptions: {
        title: "Messages",
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={styles.tab_icon}
            source={require("../../assets/icons/ic_message.png")}
          />
        )
      }
    },
    MyJobsTab: {
      screen: MyJobsScreen,
      path: "/profile",
      navigationOptions: {
        title: "My Jobs",
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={styles.tab_icon}
            source={require("../../assets/icons/ic_history.png")}
          />
        )
      }
    },
    PaymentsTab: {
      screen: PaymentsScreen,
      path: "/profile",
      navigationOptions: {
        title: "Payments",
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={styles.tab_icon}
            source={require("../../assets/icons/ic_payment.png")}
          />
        )
      }
    },
    ProfileTab: {
      screen: ProfileScreen,
      path: "/profile",
      navigationOptions: {
        title: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <Image
            style={styles.tab_icon}
            source={require("../../assets/icons/ic_profile.png")}
          />
        )
      }
    }
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: "#f26522",
      inactiveTintColor: "#f26522",
      pressColor: "#00000033",
      labelStyle: {
        fontSize: 9,        
        fontFamily: "Graystroke-Regular",
      },
      showIcon: true,
      iconStyle: {
        width: 28,
        height: 37
      },
      style: {
        backgroundColor: "#fff"
      },
      indicatorStyle: { backgroundColor: "#f26522" }
    }
  }
);

export default SimpleTabs;
