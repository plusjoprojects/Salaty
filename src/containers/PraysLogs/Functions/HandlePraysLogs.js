import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import * as SQLite from "expo-sqlite";
import moment from "moment";

import { Helper } from "../../../services";

import { UserActions } from "../../../stores";

let HandlePraysLogs = (props) => {
  let { setTodayLogs, setYesterdayLogs,setLast30Days,setLastSevenDaysLogs } = props;
  let db = SQLite.openDatabase("salate_db");

  let InstallTodayLogs = () => {
    let today = moment();
    today = Helper.FixDate(today);
    let query = "SELECT * FROM prays_logs WHERE dat = ?";
    db.transaction((tx) => {
      tx.executeSql(query, [today], (_, { rows }) => {
        let done = 0;
        let from = 0;
        let fullList = [];
        let logs = rows._array;
        logs.forEach((trg, index) => {
          from = from + 1;
          if (trg.status == 1) {
            done = done + 1;
          }
          fullList.push({ title: trg.pray, status: trg.status });
        });
        setTodayLogs({ done: done, from: from, fullList: fullList });
      });
    });
  };

  let InstallYesterdayLogs = () => {
    let yesterday = moment();
    yesterday.set("date", yesterday.get("date") - 1);
    yesterday = Helper.FixDate(yesterday);
    let query = "SELECT * FROM prays_logs WHERE dat = ?";
    db.transaction((tx) => {
      tx.executeSql(query, [yesterday], (_, { rows }) => {
        let done = 0;
        let from = 0;
        let logs = rows._array;
        logs.forEach((trg, index) => {
          from = from + 1;
          if (trg.status == 1) {
            done = done + 1;
          }
        });
        setYesterdayLogs({ done: done, from: from });
      });
    });
  };

  let InstallLastSevenDays = () => {
    let done = 0;
    let from = 0;
    let dateSetter = 0;
    for (let index = 0; index < 7; index++) {
      let day = moment();
      day.set("date", day.get("date") - dateSetter);
      day = Helper.FixDate(day)
      let query = "SELECT * FROM prays_logs WHERE dat = ?";
      db.transaction((tx) => {
        tx.executeSql(query, [day], (_, { rows }) => {
          let logs = rows._array;
          logs.forEach((trg, index) => {
            from = from + 1;
            if (trg.status == 1) {
              done = done + 1;
            }
            setLastSevenDaysLogs({from:from,done:done})
          });
        });
      });
      dateSetter = dateSetter + 1;
    }
  };

  let InstallLast30Days = () => {
    let done = 0;
    let from = 0;
    let dateSetter = 0;
    for (let index = 0; index < 30; index++) {
      let day = moment();
      day.set("date", day.get("date") - dateSetter);
      day = Helper.FixDate(day)
      let query = "SELECT * FROM prays_logs WHERE dat = ?";
      db.transaction((tx) => {
        tx.executeSql(query, [day], (_, { rows }) => {
          let logs = rows._array;
          logs.forEach((trg, index) => {
            from = from + 1;
            if (trg.status == 1) {
              done = done + 1;
            }
            setLast30Days({from:from,done:done})
          });
        });
      });
      dateSetter = dateSetter + 1;
    }
  };

  let InstallPraysLogs = () => {
    InstallTodayLogs();
    InstallYesterdayLogs();
    InstallLastSevenDays();
    InstallLast30Days()
  };

  React.useEffect(() => {
    InstallPraysLogs();
  }, []);

  return <View></View>;
};

const mapStateToProps = (state) => {
  return {
      user:state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTodayLogs: (item) => dispatch(UserActions.setTodayLogs(item)),
    setYesterdayLogs: (item) => dispatch(UserActions.setYesterdayLogs(item)),
    setLastSevenDaysLogs:(item) => dispatch(UserActions.setLastSeven(item)),
    setLast30Days:(item) => dispatch(UserActions.setLast30Days(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandlePraysLogs);
