import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View} from 'react-native';
import {StorageToken} from '../../../constants'
import {Helper, PraysTimes} from '../../../services'
import * as SQLite from 'expo-sqlite';
function PraysTimeHandler() {

  

    let GetCoordsAndTimezone = async() => {
        let location = await AsyncStorage.getItem(StorageToken.locationToken)
        if(!location){
            // There are not location 
            alert("There are no location")
            return
        }
        location = JSON.parse(location)
        let time = new Date()
        let timeZone = Helper.FixTimeZone(time.getTimezoneOffset())
        let coords = location.coords
        return {coords,timeZone}

    }

    let InstallPraysTime = async() => {
        let {coords,timeZone} = await GetCoordsAndTimezone();
        let currentDate = new Date();
        let prayTimes = PraysTimes()
        await displayMonth();
        async function displayMonth() {
            var lat = coords.latitude;
            var lng = coords.longitude;
            var TZ = timeZone
            var dst = 0;
            var method = "MWL";
    
            prayTimes.setMethod(method);
            currentDate.setMonth(currentDate.getMonth());
            var month = currentDate.getMonth();
            var year = currentDate.getFullYear();
            await getTimesData(year,month,lat,lng,TZ,dst,'24h')
        }

        async function getTimesData(year,month,lat,lng,tz,dst,format) {
            let startDate = new Date(year,month,1)
            let endDate = new Date(year,month + 1,1)
            while (startDate < endDate) {

                let pray_time = prayTimes.getTimes(startDate,[lat,lng],tz,dst,format)
                let _dateNumber = Helper.DataNumber(startDate)
                let praysString = JSON.stringify(pray_time)
                await insertToDB(praysString,_dateNumber)
                startDate.setDate(startDate.getDate() + 1) // next Day
            }
            return true;
        }
        
        
        async function insertToDB(prays,_dateNumber) {
            let db = SQLite.openDatabase("salate_db")
            let query = `INSERT INTO prays (prays,year,month,day) VALUES (?,?,?,?)`
            db.transaction(tx => {
                tx.executeSql(query,[prays,_dateNumber.year,_dateNumber.month,_dateNumber.day])
            })
            return true;
        }
        return "done";
    }
     return {
        InstallPraysTime
     }
}

export default PraysTimeHandler()