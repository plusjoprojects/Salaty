import React from 'react';
import { View } from 'react-native';
import { Layout,Text, Toggle } from '@ui-kitten/components';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageToken} from '../../../constants'
import * as Notifications from "expo-notifications";
import SetupNotification from '../../../containers/Intro/FullSetup/SetupNotification'
let EditNotification = () => {
    let [notificationOn,setNotificationOn] = React.useState(true)
    let InstallNotificationToggle = async() => {
        let notificationToggle = await AsyncStorage.getItem(StorageToken.notificationToggle)
        if(!notificationToggle) {
            setNotificationOn(true)
            await AsyncStorage.setItem(StorageToken.notificationToggle,"true")
        }else {
            if(notificationToggle == "true") {
                setNotificationOn(true)
            }else {
                setNotificationOn(false)

            }
        }
    }

    React.useEffect(() => {
        InstallNotificationToggle()
    },[])
    let Change = async(val) => {
        if(!val) {
            setNotificationOn(val)
            await AsyncStorage.setItem(StorageToken.notificationToggle,"false")
            await Notifications.cancelAllScheduledNotificationsAsync()
        }else {
            setNotificationOn(val)
            await AsyncStorage.setItem(StorageToken.notificationToggle,"true")
            setTimeout(async() => {
                await SetupNotification.setupNotificationAsync()
            },300)
        }
    }
     return(
         <View style={{padding:15,height:550,}}>
            <Text style={{color:'black',fontSize:24,textAlign:'left'}}>الإشعارات</Text>
            <View style={{marginTop:15}}>
                <Toggle
                checked={notificationOn} onChange={Change}
                >الأشعارات</Toggle>
            </View>
         </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditNotification);