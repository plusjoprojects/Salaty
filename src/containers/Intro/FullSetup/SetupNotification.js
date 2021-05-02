import React from "react";
import { View } from "react-native";
import { Button } from "@ui-kitten/components";
import * as Notifications from "expo-notifications";
import * as SQLite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageToken } from "../../../constants";
function SetupNotification() {
  async function setupNotificationAsync() {
    let notificationToggle = await AsyncStorage.getItem(
      StorageToken.notificationToggle
    );
    if (!notificationToggle) {
      let db = SQLite.openDatabase("salate_db");
      let query = "SELECT * FROM prays";
      db.transaction((tx) => {
        tx.executeSql(
          query,
          [],
          async (_, { rows }) => {
            await schedulePushNotification(rows._array);
          },
          (tr,err) => {
            console.log("err", err);
          }
        );
      });
    } else {
      if (notificationToggle == "true") {
        let db = SQLite.openDatabase("salate_db");
        let query = "SELECT * FROM prays";
        db.transaction((tx) => {
          tx.executeSql(
            query,
            [],
            async (_, { rows }) => {
              await schedulePushNotification(rows._array);
            },
            (tr,err) => {
              console.log("err", err);
            }
          );
        });
      }
    }
  }

  function getTodayDayNumber() {
    let date = new Date();
    return date.getDate();
  }

  function getTodayPrays(praysTimes, day) {
    let prayTime = "";
    praysTimes.forEach((trg, index) => {
      if (trg.day == day) {
        prayTime = trg.prays;
      }
    });
    return JSON.parse(prayTime);
  }

  function filterTime(time) {
    let filteredTime = time.split(":");
    return filteredTime;
  }
  async function schedulePushNotification(praysTimes) {
    let today = getTodayDayNumber();
    let prayTime = getTodayPrays(praysTimes, today);
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Register Methods For Local Storage
    await AsyncStorage.setItem("@praysTimes_day", today.toString());
    await AsyncStorage.setItem(StorageToken.firstTime, "false");

    // Register Fajer
    let fajerTime = filterTime(prayTime.fajr);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "موعد الصلاة",
        body: "حان الأن موعد أذان الفجر",
        data: { data: "fajer" },
      },
      trigger: { hour: parseInt(fajerTime[0]), minute: parseInt(fajerTime[1]),repeats:true },
    });

    // Register duhr
    let dhuhrTime = filterTime(prayTime.dhuhr);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "موعد الصلاة",
        body: "حان الأن موعد أذان الضهر",
        data: { data: "dhuhr" },
      },
      trigger: { hour: parseInt(dhuhrTime[0]), minute: parseInt(dhuhrTime[1]),repeats:true },
    });
    // Register asr
    let asrTime = filterTime(prayTime.asr);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "موعد الصلاة",
        body: "حان الأن موعد أذان العصر",
        data: { data: "asr" },
      },
      trigger: { hour: parseInt(asrTime[0]), minute: parseInt(asrTime[1]),repeats:true },
    });
    // Register maghrib
    let maghribTime = filterTime(prayTime.maghrib);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "موعد الصلاة",
        body: "حان الأن موعد أذان المغرب",
        data: { data: "maghrib" },
      },
      trigger: {
        hour: parseInt(maghribTime[0]),
        minute: parseInt(maghribTime[1]),
        repeats:true
      },
    });
    // Register Isha
    let ishaTime = filterTime(prayTime.isha);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "موعد الصلاة",
        body: "حان الأن موعد أذان العشاء",
        data: { data: "isha" },
      },
      trigger: { hour: parseInt(ishaTime[0]), minute: parseInt(ishaTime[1]) ,repeats:true},
    });
  }
  return {
    setupNotificationAsync,
  };
}

export default SetupNotification();
