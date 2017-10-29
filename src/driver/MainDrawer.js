import React from "react";
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  MenuButton,
  View
} from "react-native";
import {
  DrawerNavigator,
  DrawerItems,
  NavigationActions
} from "react-navigation";
import MainTabs from "./MainTabs";
import MainJobsScreen from "./home/MyJobsScreen";

MainTabs.navigationOptions = {
  drawerLabel: "HOME",
  drawerIcon: ({ tintColor }) => (
    <Image
      style={styles.tab_icon}
      source={require("../../assets/icons/ic_home.png")}
    />
  )
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "ios" ? 20 : 0
  },
  tab_icon: {
    alignSelf: "center",
    width: 22,
    height: 22,
    resizeMode: "contain",
    tintColor: "#f26522"
  },
  tab_title: {
    fontSize: 9,
    color: "#f26522",
    fontWeight: "bold"
  },
  drawer_item: {
    padding: 16
  },
  drawer_label: {
    fontFamily: "Graystroke-Regular",
    fontSize: 14,
    color: "#363636",
    marginLeft: -8
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

const GeneralLoadsScreen = ({ navigation }) => (
  <MyNavScreen banner={"General Loads Screen"} navigation={navigation} />
);

GeneralLoadsScreen.navigationOptions = {
  drawerLabel: "GENERAL LOADS",
  drawerIcon: ({ tintColor }) => (
    <Image
      style={styles.tab_icon}
      source={require("../../assets/icons/ic_check_circle.png")}
    />
  )
};

const ExpressLoadsScreen = ({ navigation }) => (
  <MyNavScreen banner={"General Loads Screen"} navigation={navigation} />
);

ExpressLoadsScreen.navigationOptions = {
  drawerLabel: "EXPRESS LOADS",
  drawerIcon: ({ tintColor }) => (
    <Image
      style={styles.tab_icon}
      source={require("../../assets/icons/ic_bullseye.png")}
    />
  )
};

const CustomDrawerContentComponent = props => (
  <View>
    <DrawerItems
      {...props}
      getLabel={scene => (
        <View style={styles.drawer_item}>
          <Text style={styles.drawer_label}>{props.getLabel(scene)}</Text>
        </View>
      )}
    />
  </View>
);

const MainDrawer = DrawerNavigator(
  {
    Home: {
      path: "/",
      screen: MainTabs,
    },
    GeneralLoads: {
      path: "/sent",
      screen: GeneralLoadsScreen
    },
    ExpressLoads: {
      path: "/sent",
      screen: ExpressLoadsScreen
    }
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#000000"
    },
    contentComponent: CustomDrawerContentComponent
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
