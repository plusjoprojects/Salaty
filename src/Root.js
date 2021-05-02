/**
 * Root.js
 * Make By Ahmed Altommy
 * #Main App Bootstrap.
 */

import * as SplashScreen from "expo-splash-screen";

import { StyleSheet } from "react-native";
import { FontsLoader, LocaleLoader } from "./services";


import { Provider } from "react-redux";
import React from "react";
import Router from "./Router";
import store from "./stores/store";


export default function App(props) {
  // Constants
  const [isLoadingComplete, setLoadingComplete] = React.useState(false); // Async Loading

  // Install
  let install = async () => {
    try {
      // Splash Screen
      await SplashScreen.preventAutoHideAsync();

      // Load Fonts
      await FontsLoader();

      // Locale Loader
      await LocaleLoader();

      // End
    } catch (error) {
      // On Error
      console.log(error);
    } finally {
      // When Complete
      setTimeout(async () => {
        setLoadingComplete(true);
        await SplashScreen.hideAsync();
      }, 1000);
    }
  };

  React.useEffect(() => {
    // Call Install Function
    install();
  }, []);

  // --------------- Return -------------- //

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <Provider store={store} style={styles.container}>
        <Router />
      </Provider>
    );
  }
}

// ---------- Styles --------- //
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});