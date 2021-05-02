import React, { useEffect } from "react";
import { ImageBackground, View } from "react-native";
import { Spinner } from "@ui-kitten/components";
import styles from "./styles";

// Services
import { LocaleLoader, FontsLoader } from "../../services";

// Stores
import { connect } from "react-redux";
import { UserActions } from "../../stores";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageToken } from "../../constants";

import * as SQLite from "expo-sqlite";

// Query From other pages
import InstallDB from "../Intro/FullSetup/InstallDB";
import PraysTimeHandler from "../Intro/FullSetup/InstallPraysTime";
import SetupNotification from "../Intro/FullSetup/SetupNotification";
import InstallPraysLogs from '../Intro/FullSetup/InstallPraysLogs'

let Loading = (props) => {
  let { setPrays } = props;
  let GetPraysTime = () => {
    InstallPraysLogs.CreatePraysLogs()
    // Variables
    let db = SQLite.openDatabase("salate_db");
    let date = new Date();
    let today = date.getDate();
    let query = "SELECT * FROM prays WHERE day = ? LIMIT 1";

    // Get Data
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [today],
        (_, { rows }) => {
          if (rows._array.length >= 1) {
            let _prays = rows._array[0].prays;
            _prays = JSON.parse(_prays);
            setPrays(_prays);
            props.navigation.navigate("MainNavigation");
          }
        },
        (err) => {
          console.log(err);
        }
      );
    });

  };

  let RestartIntroMethods = async () => {
    await InstallDB.CreateDB();
    await PraysTimeHandler.InstallPraysTime();
    await SetupNotification.setupNotificationAsync();
    GetPraysTime();
  };

  let RestartDayNotification = async () => {
    await SetupNotification.setupNotificationAsync();
    GetPraysTime();
  };

  let DayChecker = async () => {
    let date = new Date();
    let today = date.getDate();
    let registeredDay = await AsyncStorage.getItem("@praysTimes_day");

    if (today == registeredDay) {
      GetPraysTime();
    } else {
      // Restart The Notification Method
      RestartDayNotification();
    }
  };

  let MonthChecker = () => {
    let date = new Date();
    let month = date.getMonth() + 1;
    let db = SQLite.openDatabase("salate_db");

    let query = "SELECT month FROM prays LIMIT 1";
    db.transaction((tx) => {
      tx.executeSql(query, [], (_, { rows }) => {
        if (rows._array.length >= 1) {
          check(rows._array[0].month);
        } else {
          props.navigation.navigate("Intro");
        }
      });
    });
    async function check(registeredMonth) {
      if (registeredMonth == month) {
        // the same month complete
        DayChecker();
      } else {
        // Restart the intro function not the same month
        RestartIntroMethods();
      }
    }
  };

  // Check if User Have First Time Fetch The App
  let checkIsFirstTime = async () => {
    let status = false;
    let isFirstTimeToken = await AsyncStorage.getItem(StorageToken.firstTime);
    if (!isFirstTimeToken) {
      status = true;
    } else {
      status = false;
    }
    return status;
  };
  let checker = async () => {
    await LocaleLoader();
    await FontsLoader();

    // Check is first time.
    let isFirstTime = await checkIsFirstTime();
    if (isFirstTime) {
      // If first time navigation > navigate to intro
      props.navigation.navigate("Intro");
      return;
    }

    // First Check is same month;
    MonthChecker();

    // props.navigation.navigate("MainNavigation") // Navigate To Intro After First Load
  };

  // UseEffect
  useEffect(() => {
    checker();
  }, []);

  return (
    <ImageBackground
      style={styles.container}
      source={require("../../assets/backgrounds/background-loading-min.jpg")}
    >
      <View style={styles.pt30}>
        <Spinner status="basic" />
      </View>
    </ImageBackground>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (item) => dispatch(UserActions.setUser(item)),
    setPrays: (item) => dispatch(UserActions.setPrays(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
