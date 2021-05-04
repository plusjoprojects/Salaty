import React from "react";
import { View } from "react-native";
import * as SQLite from "expo-sqlite";

function InstallDB() {
  let db = SQLite.openDatabase("salaty_db");

  let CreateDB = async () => {
    let status = 0;

    let CreateTableQuery = `CREATE TABLE IF NOT EXISTS prays (
                ID INTEGER PRIMARY KEY,
              prays TEXT,
              day INTEGER,
              month INTEGER,
              year INTEGER
        )`;

    db.transaction((tx) => {
      tx.executeSql("DROP TABLE 'prays'",[],() => {},(tr,err) => {console.log("Error Drop",err)});
        tx.executeSql(
          CreateTableQuery,
          [],
          (res) => {
            console.log("Done Create Tables")
            status = 1;
          },
          (tr, err) => {
            console.log("error create data",err);
            status = 0;
          }
        );
    },err => {console.log("Transaction Error "+ err)});

    return status;
  };
  return {
    CreateDB,
  };
}

export default InstallDB();
