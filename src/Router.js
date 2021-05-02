/**
 * Router.js
 * Make By Ahmed Altommy
 * #Main Navigation Handler.
 */

import {Platform,StatusBar} from 'react-native'

import {
  createStackNavigator,
} from "@react-navigation/stack";

import { Animations } from "./constants";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

// Navigation Screens
import { Loading } from "./containers";
import MainNavigation from "./navigation/MainNavigation";
import IntroNavigation from './navigation/IntroNavigation'

const Stack = createStackNavigator();

// Theme And Components
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components"; // UI Application Provider
import { EvaIconsPack } from "@ui-kitten/eva-icons"; // Icons Pack
import { default as mapping } from "./assets/theme/mapping.json";
import { default as theme } from "./assets/theme/theme.json";
import * as eva from "@eva-design/eva"; //Design System

export default () => {
  let RouterComponents = () => (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={Animations.screenOptionsHome}
        initialRouteName={"Loading"}
        headerMode="float"
        animation="fade"
      >
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Intro" component={IntroNavigation} />
        <Stack.Screen name="MainNavigation" component={MainNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.light, ...theme }}
        customMapping={mapping}
      >
        <StatusBar barStyle="default" />
        <RouterComponents />
      </ApplicationProvider>
    </>
  );
};
