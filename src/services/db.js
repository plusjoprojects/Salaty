import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

let db = {
    installDB: async() => {
        if (
            !(
              await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite")
            ).exists
          ) {
            await FileSystem.makeDirectoryAsync(
              FileSystem.documentDirectory + "SQLite"
            );
          }
    
          if (
            !(
              await FileSystem.getInfoAsync(
                FileSystem.documentDirectory + "SQLite/aa.db"
              )
            ).exists
          ) {
            await FileSystem.downloadAsync(
              Asset.fromModule(require("../assets/demo.db")).uri,
              FileSystem.documentDirectory + "SQLite/aa.db"
            );
          }
    
          return SQLite.openDatabase("aa.db");
    }
}

export default db;