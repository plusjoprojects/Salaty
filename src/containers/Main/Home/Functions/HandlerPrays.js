import React from 'react';
import {View} from 'react-native';
import {Helper} from '../../../../services'
import moment from 'moment';
import 'moment/locale/ar';

function HandlerPrays() {
    let CheckNowPray = (prays) => {
        let _prays = Helper.PraysFilter(prays)
        let fixedDate = Helper.FixDate(new Date())
        let nextPraysList = []
        let pastPraysList = []
        _prays.forEach((trg,index) => {
            if(NextPrayDuration(fixedDate + " " + trg.time,false).queryMinute >= 0) {
                nextPraysList.push(trg)
            }else {
                pastPraysList.push(trg)
            }
        })
       
        // Register Prays
        let nowPray = {}
        let nextPray = {}
        let leftToPray = ""
        if(pastPraysList.length >= 1) {
            // Make Last Pray in past prays list is the currect pray
            nowPray = pastPraysList[pastPraysList.length -1]
        }else {
            // Make Now Pray Is Isha from last day 
            nowPray = _prays[prays.length -1]
        }
        if(nextPraysList.length >= 1) {
            // Make First The next pray
            nextPray = nextPraysList[0]
            leftToPray = NextPrayDuration(fixedDate + " " + nextPraysList[0].time,false).queryHumanize
        }else {
            // Make next Day Fajr Next Pray
            nextPray = _prays[0]
            leftToPray = NextPrayDuration(fixedDate + " " + _prays[0].time,true).queryHumanize

        }

        return {
            nowPray:nowPray,
            nextPray:nextPray,
            leftToPray:leftToPray
        }
    }
    
    let NextPrayDuration = (nextPrayPrefix,nextDay = false) => {
        moment.locale("ar")
        let nextPrayTime = moment(nextPrayPrefix)
        let today = moment()
        if(nextDay) {
            nextPrayTime.set("date",today.get("date") + 1)
        }
        let queryHumanize = moment.duration({ from: today, to: nextPrayTime }).humanize(true)
        let queryMinute = moment.duration({ from: today, to: nextPrayTime }).asMinutes(true)
        return {
            queryHumanize:queryHumanize,
            queryMinute:queryMinute
        }
    }

     return {NextPrayDuration,CheckNowPray}
}

export default HandlerPrays()