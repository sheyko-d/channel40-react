import React from "react";
import {
  Component,
  Platform,
  StyleSheet,
  Button,
  ScrollView,
  Text,
  Image
} from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import FindLoadsScreen from "./home/findloads/FindLoadsScreen";
import MyJobsScreen from "./home/MyJobsScreen";
import MessagesScreen from "../messages/MessagesScreen";
import PaymentsScreen from "./home/payments/PaymentsScreen";
import ProfileScreen from "./home/profile/ProfileScreen";

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
  tab_icon: {
    alignSelf: "center",
    width: 28,
    height: 28,
    marginTop: Platform.OS === "ios" ? 0 : 8,
    resizeMode: "contain",
    tintColor: "#f26522"
  },
  tab_title: {
    fontSize: 9,
    color: "#f26522",
    fontWeight: "bold"
  }
});

const MainTabsNavigator = TabNavigator(
  {
    MainTab: {
      screen: FindLoadsScreen,
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
      path: "/messages",
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
        fontFamily: "Graystroke-Regular"
      },
      showIcon: true,
      iconStyle: {
        width: 28,
        height: 37
      },
      style: {
        backgroundColor: "#fff",
        height: Platform.OS === "ios" ? 70 : 80,
        paddingBottom: 8
      },
      indicatorStyle: { backgroundColor: "#f26522" }
    }
  }
);

class MainTabs extends React.Component {
  render() {
    return <MainTabsNavigator screenProps={this.props.navigation} />;
  }
}

export default MainTabs;
