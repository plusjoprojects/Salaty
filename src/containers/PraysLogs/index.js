import React from 'react';
import { View,ImageBackground,Platform } from 'react-native';
import { Layout,Text } from '@ui-kitten/components';
import { connect } from 'react-redux';

// Components
import DetailsCards from './Components/DetailsCards'
import Logs from './Components/PraysLogs'
import { AdMobInterstitial } from "expo-ads-admob";
import {Ads} from '../../constants'
// Functions 
import HandlePraysLogs from './Functions/HandlePraysLogs'

let PraysLogs = () => {
     let InstallAds = async() => {
          await AdMobInterstitial.setAdUnitID(
               Platform.OS == 'android'? Ads.android.appBreak:Ads.ios.appBreak
             ); // Test ID, Replace with your-admob-unit-id
             await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
             await AdMobInterstitial.showAdAsync();
     }

     React.useEffect(() => {
          InstallAds()
     },[])

     return(
         <Layout style={{flex:1}}>
            <ImageBackground
            style={{flex:1}}
            source={require('../../assets/backgrounds/background-home-min.jpg')}
            resizeMode="cover"
            >
               <View style={{flex:1,flexDirection:'column'}}>
                    <View style={{flex:1.5}}>
                         <DetailsCards />
                    </View>
                    <View style={{flex:1}}>
                         <Logs />
                    </View>
               </View>
               <HandlePraysLogs />
            </ImageBackground>
         </Layout>
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

export default connect(mapStateToProps, mapDispatchToProps)(PraysLogs);