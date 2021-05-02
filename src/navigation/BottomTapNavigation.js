import { Feather } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import { useTheme } from "@ui-kitten/components";

import { connect } from "react-redux";

import { Main,PraysLogs,PraysTimes,Settings } from "../containers";

const Tab = AnimatedTabBarNavigator();

let BottomTapNavigation = (props) => {
  let theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "الرئيسية") {
            iconName = focused ? "tablet" : "tablet";
          } else if(route.name === "الصلوات") {
            iconName = focused ? "list" : "list";
          }
          else if(route.name === "الأوقات") {
            iconName = focused ? "book" : "book";
          }
          else if(route.name === "الاعدادات") {
            iconName = focused ? "settings" : "settings";
          }

          // You can return any component that you like here!
          return <Feather name={iconName} size={size} color={color} />
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: "gray",
        activeBackgroundColor:theme["color-primary-500"]
      }}
      initialRouteName={"الرئيسية"}
      appearance={{
        floating:true
      }}
    >
      <Tab.Screen name="الرئيسية" component={Main.Home} />
      <Tab.Screen name="الأوقات" component={PraysTimes} />
      <Tab.Screen name="الصلوات" component={PraysLogs} />
      <Tab.Screen name="الاعدادات" component={Settings} />
    </Tab.Navigator>
  );
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomTapNavigation);
