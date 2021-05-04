import React from "react";
import { View, ImageBackground, Platform } from "react-native";
import {
  Layout,
  Text,
  Select,
  SelectItem,
  IndexPath,
} from "@ui-kitten/components";
import { connect } from "react-redux";
import moment from 'moment'
import { Helper } from '../../services'
import * as SQLite from 'expo-sqlite'
import { AdMobInterstitial } from "expo-ads-admob";
import { Ads } from '../../constants'

let PraysTimes = () => {
  let [days, setDays] = React.useState([])
  let [dayIndex, setDayIndex] = React.useState(new IndexPath(0));
  let [praysTime, setPraysTime] = React.useState([])


  let InstallDays = () => {
    let lastDayOfMonth = moment().clone().endOf("month")
    let lastDay = lastDayOfMonth.get("date") + 1
    let daysList = []
    for (let index = 1; index < lastDay; index++) {
      daysList.push(index)
    }
    setDays(daysList)
    setDayIndex(new IndexPath(moment().get("date") - 1))
    InstallPrays(days[dayIndex.row])
  }

  let InstallAds = async () => {
    await AdMobInterstitial.setAdUnitID(
      Platform.OS == 'android' ? Ads.android.appBreak : Ads.ios.appBreak
    ); // Test ID, Replace with your-admob-unit-id
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    await AdMobInterstitial.showAdAsync();
  }

  let InstallPrays = (day) => {
    let db = SQLite.openDatabase("salate_db")
    let dat = moment()
    dat.set("date", day)
    let query = "SELECT * FROM prays WHERE month = ? AND day = ?"
    db.transaction(tx => {
      tx.executeSql(query, [dat.get("month") + 1, dat.get("date")], (_, { rows }) => {
        if (rows.length > 0) {
          if (Platform.OS == "web") {
            let praysList = JSON.parse(rows[0].prays)
            let praysListFilters = Helper.PraysFilter(praysList)
            setPraysTime(praysListFilters)
          } else {
            let praysList = JSON.parse(rows._array[0].prays)
            let praysListFilters = Helper.PraysFilter(praysList)
            setPraysTime(praysListFilters)
          }

        }
      }, err => { console.log(err) })
    })
  }

  React.useEffect(() => {
    InstallDays()
    InstallAds()
  }, [])

  let DetailsPanelList = (props) => {
    let { text, time } = props;
    return (
      <View
        style={{
          width: "100%",
          paddingVertical: 10,
          paddingHorizontal: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          marginTop: 2,
        }}
      >
        <View style={{ paddingHorizontal: 5 }}>
          <Text style={{ color: "white", fontSize: 16 }}>{text}</Text>
        </View>
        <View
          style={{
            paddingHorizontal: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, marginHorizontal: 3 }}>
            {time}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <Layout style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../../assets/backgrounds/background-home-min.jpg")}
      >
        <View style={{ paddingTop: 20, paddingHorizontal: 15 }}>
          <Text style={{ color: "white", fontSize: 24, textAlign: "left" }}>
            مواقيت الصلاة
            </Text>
          <Select
            label="أليوم"
            selectedIndex={dayIndex}
            onSelect={(index) => {
              setDayIndex(index);
              InstallPrays(index)
            }}
            value={'أليوم ' + days[dayIndex.row]}
          >
            {days.map((trg, index) => (
              <SelectItem title={trg} key={index}></SelectItem>
            ))}
          </Select>
        </View>
        <View style={{ padding: 15 }}>
          {praysTime.map((pr, index) => (
            <DetailsPanelList text={Helper.fixPrayName(pr.text)} key={index} time={Helper.hour24to12(pr.time)} />
          ))}

        </View>
      </ImageBackground>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PraysTimes);
