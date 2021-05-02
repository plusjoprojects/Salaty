import React from "react";


/** Navigation Components */
import {
  createStackNavigator,
} from "@react-navigation/stack";


/** Screens */
import {Intro} from '../containers'

/** Stack Creator */
const Stack = createStackNavigator();

// ------- Constants -------//
import {Animations} from '../constants'

/** Render() */
export default function IntroNavigation(props) {
  return (
    <Stack.Navigator
      screenOptions={Animations.screenOptions}
      headerMode="float"
      animation="fade"
      initialRouteName={"IntroMain"}
    >
     <Stack.Screen name="IntroMain" component={Intro.IntroMain} />
     <Stack.Screen name="EnterName" component={Intro.EnterName} />
     <Stack.Screen name="SetupPermissions" component={Intro.SetupPermissions} />
     <Stack.Screen name="SelectCountry" component={Intro.SelectCountry} />
     <Stack.Screen name="FullSetup" component={Intro.FullSetup} />
    </Stack.Navigator>
  );
}
