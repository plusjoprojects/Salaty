import React from "react";
import { View, ImageBackground,Platform } from "react-native";
import { Layout, Text, useTheme, Spinner } from "@ui-kitten/components";
import { connect } from "react-redux";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import * as SQLite from "expo-sqlite";
import InstallDB from "./InstallDB";
import PraysTimeHandler from "./InstallPraysTime";
import SetupNotification from "./SetupNotification";
import InstallPraysLogs from "./InstallPraysLogs";
import { UserActions } from "../../../stores";
let FullSetup = (props) => {
  let [fill, setFill] = React.useState(0);
  let [setupType, setSetupType] = React.useState("ضبط قاعدة البيانات");
  let theme = useTheme();

  let install = async () => {
    let installDB = await InstallDB.CreateDB();
    setFill(30);
    setTimeout(async () => {
      setSetupType("ضبط مواعيد الصلاة");
      await PraysTimeHandler.InstallPraysTime();
      InstallPraysLogs.CreatePraysLogs();
      setFill(60);
      setTimeout(() => {
        setSetupType("ضبط المنبه");
      }, 1000);
      if(Platform.OS !== "web") {
        await SetupNotification.setupNotificationAsync();
      }
      setFill(100);
      setTimeout(() => {
        setSetupType("انتهى الأعداد");
        InstallPraysToStore();
      }, 1000);
    }, 1000);
  };

  let InstallPraysToStore = () => {
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
          console.log(rows)

          if(Platform.OS == "web") {
            if (rows.length >= 1) {
              let _prays = rows[0].prays;
              _prays = JSON.parse(_prays);
              props.setPrays(_prays);
              props.navigation.navigate("MainNavigation");
            }
          }else {
            if (rows.length >= 1) {
              let _prays = rows._array[0].prays;
              _prays = JSON.parse(_prays);
              props.setPrays(_prays);
              props.navigation.navigate("MainNavigation");
            }
          }
          
        },
        (err) => {
          console.log(err);
        }
      );
    });
  };

  React.useEffect(() => {
    install();
  }, []);

  return (
    <Layout style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1, justifyContent: "center" }}
        source={require("../../../assets/backgrounds/background-loading-min.jpg")}
        resizeMode="cover"
      >
        <Text
          style={{
            color: "white",
            fontSize: 30,
            textAlign: "left",
            marginHorizontal: 15,
          }}
        >
          ضبط الإعدادات
        </Text>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 26,
          }}
        >
          <AnimatedCircularProgress
            size={160}
            width={15}
            fill={fill}
            tintColor={theme["color-primary-500"]}
            rotation={0}
            duration={1000}
            backgroundColor={theme["color-primary-300"]}
          >
            {(fill) => (
              <Text style={{ color: "white" }}>{fill.toFixed(2)}%</Text>
            )}
          </AnimatedCircularProgress>
          <Text style={{ color: "white", fontSize: 16 }}>{setupType}</Text>
          <Spinner />
        </View>
      </ImageBackground>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPrays: (item) => dispatch(UserActions.setPrays(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullSetup);
