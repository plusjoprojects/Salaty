import React from 'react';
import {View} from 'react-native';
import * as Location from 'expo-location';


 function LocationPermissions() {

   async function GetLocationPermissionsAndCoords() {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            // If No Allow For Location Permission
            return {location:{},status:0}
        }
        let location = await Location.getCurrentPositionAsync({});
        return {
            location:location,
            status:1
        };
    }

     return {
         GetLocationPermissionsAndCoords
     }
}

export default LocationPermissions()