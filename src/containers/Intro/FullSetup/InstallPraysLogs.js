import React from "react";
import { View } from "react-native";
import * as SQLite from "expo-sqlite";
import { Helper } from "../../../services";

function InstallPraysLogs() {
 let db = SQLite.openDatabase("salaty_db")
  let CreatePraysLogs = () => {
    let Query = `CREATE TABLE IF NOT EXISTS prays_logs (
            pray text,
            status INTEGER,
            dat TEXT	
        );`;

    db.transaction(tx => {
        tx.executeSql(Query,[],res => {
            InsertTodayPrayLogs()
            console.log("Prays logs Table")
        },(tr,err) => {
            console.log("prays_logs_error",err)
            InsertTodayPrayLogs()
        })
    })
  };
  let InsertTodayPrayLogs = () => {
    let today = new Date();
    let date = Helper.FixDate(today)
    let query = "SELECT * FROM prays_logs WHERE dat = ?"
    db.transaction(tx => {
        tx.executeSql(query,[date],(_,{rows}) => {
            if(rows.length == 0) {
                CreateNewTodayLogs()
            }
        },(tr,err) => {console.log(err)})
    })
    }

    let CreateNewTodayLogs = () => {
    let prays = ["fajr","dhuhr","asr","maghrib","isha"]
    let today = new Date();
    let date = Helper.FixDate(today)
    let query = "INSERT INTO prays_logs (pray,status,dat) VALUES (?,?,?)"
    prays.forEach((trg,index) => {
        db.transaction(tx => {
            tx.executeSql(query,[trg,0,date])
        })
    })
    }

  return {CreatePraysLogs}
}

export default InstallPraysLogs();
