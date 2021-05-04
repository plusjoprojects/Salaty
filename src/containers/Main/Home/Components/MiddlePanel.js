import React from "react";
import { View, TouchableOpacity,Platform } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { Helper } from "../../../../services";
import * as SQLite from "expo-sqlite";
import { AdMobInterstitial } from "expo-ads-admob";
import {Ads} from '../../../../constants'
let MiddlePanel = ({ user }) => {
  let { nowPray } = user;
  let [haveLog, setHaveLog] = React.useState(false);
  let [show, setShow] = React.useState(true);
  let db = SQLite.openDatabase("salaty_db");
  let today = new Date();
  let dat = Helper.FixDate(today);
  let CheckPrayLog = async () => {
    let query = "SELECT * FROM prays_logs WHERE dat = ? AND pray = ?;";
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [dat, nowPray.text],
        (_, { rows }) => {
          // setShow(false)
          if (rows.length !== 0) {
            setHaveLog(rows._array[0].status == 0 ? false : true);
          }
          // setShow(true)
        },
        (err) => {
          console.log(err);
        }
      );
    });
    
  };

  let CallAds = async() => {
    await AdMobInterstitial.setAdUnitID(
      Platform.OS == 'android'? Ads.android.appBreak:Ads.ios.appBreak
    ); // Test ID, Replace with your-admob-unit-id
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    await AdMobInterstitial.showAdAsync();
  }

  let PressLog = async() => {
    let query = "UPDATE prays_logs SET status = 1 WHERE dat = ? AND pray = ?";
    db.transaction((tx) => {
      tx.executeSql(query, [dat, nowPray.text], (res) => {
        setHaveLog(true);
      });
    });

   CallAds()
  };

  React.useEffect(() => {
    CheckPrayLog();
  });

  let CheckButton = () => {
    let circleSpace = 100;
    let circleRadius = circleSpace / 2;
    let iconSize = circleSpace / 2;
    let disableColors = ["white", "rgba(0,0,0,0.3)"];
    let successColors = ["green", "rgba(0,0,0,0.3)"];
    let statusColor = haveLog ? successColors : disableColors;
    return (
      <TouchableOpacity
        onPress={() => {
          if (!haveLog) {
            PressLog();
          }
        }}
        style={{
          height: circleSpace,
          width: circleSpace,
          borderRadius: circleRadius,
          borderColor: statusColor[0],
          borderWidth: 2,
          backgroundColor: statusColor[1],
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AntDesign
          style={{ fontSize: iconSize, color: statusColor[0] }}
          name="check"
        ></AntDesign>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ color: "white", fontSize: 22, textAlign: "left" }}>
        هل قمت بصلاة {Helper.fixPrayName(nowPray.text)} ؟
      </Text>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {show && <CheckButton />}
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MiddlePanel);
