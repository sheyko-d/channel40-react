import React from "react";
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  MenuButton
} from "react-native";
import { DrawerNavigator } from "react-navigation";
import MainTabs from "./MainTabs";

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "ios" ? 20 : 0
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
  <ScrollView style={styles.container}>
    <Text>{banner}</Text>
    <Button
      onPress={() => navigation.navigate("DrawerOpen")}
      title="Open drawer"
    />
    <Button onPress={() => navigation.goBack(null)} title="Go back" />
  </ScrollView>
);

const DraftsScreen = ({ navigation }) => (
  <MyNavScreen banner={"Drafts Screen"} navigation={navigation} />
);
DraftsScreen.navigationOptions = {
  drawerLabel: "Drafts",
  drawerIcon: ({ tintColor }) => (
    <Image
      style={styles.tab_icon}
      source={require("../../assets/icons/ic_profile.png")}
    />
  )
};

const MainDrawer = DrawerNavigator(
  {
    Home: {
      path: "/",
      screen: MainTabs
    },
    Drafts: {
      path: "/sent",
      screen: DraftsScreen
    }
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    }
  }
);

MainDrawer.navigationOptions = {
  title: "CHANNEL 40",
  headerStyle: {
    backgroundColor: "#f26522"
  },
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

export default MainDrawer;
