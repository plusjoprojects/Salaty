import React from 'react';
import { View } from 'react-native';
import { Layout,Text } from '@ui-kitten/components';
import { connect } from 'react-redux';
import moment from 'moment'

let InstallMonthDay  = () => {
    let GetMonthDays = () => {
        let lastDayOfMonth = moment().clone().endOf("month")
        let lastDay = lastDayOfMonth.get("date")
        console.log(lastDay)
    }

    React.useEffect(() => {
        GetMonthDays()
    },[])
     return(
         <View></View>
     )
}


const mapStateToProps = (state) => {
     return {
         
     }
};

const mapDispatchToProps = (dispatch) => {
     return {
         
     }
};

export default connect(mapStateToProps, mapDispatchToProps)(InstallMonthDay);