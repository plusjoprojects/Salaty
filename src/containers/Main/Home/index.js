import React from "react";
import { View, ImageBackground, ScrollView,Platform } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { connect } from "react-redux";
import 'moment/locale/ar';
import {UserActions} from '../../../stores'

// Components
import TopPanel from "./Components/TopPanel";
import MiddlePanel from "./Components/MiddlePanel";
import FooterPanel from "./Components/FooterPanel";
import * as Analytics from 'expo-firebase-analytics';

// Functions
import HandlerPrays from './Functions/HandlerPrays'

import { AdMobInterstitial } from "expo-ads-admob";
import {Ads} from '../../../constants'

let Home = ({prays,setPray}) => {
  
  let CallAds = async() => {
    await AdMobInterstitial.setAdUnitID(
      Platform.OS == 'android'? Ads.android.appBreak:Ads.ios.appBreak
    ); // Test ID, Replace with your-admob-unit-id
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
    await AdMobInterstitial.showAdAsync();
  }

  let InstallAnalytics = async() => {
    await Analytics.setAnalyticsCollectionEnabled(true)
  }
  React.useEffect(() => {
    let {leftToPray,nowPray,nextPray} = HandlerPrays.CheckNowPray(prays)
    
    setPray({
      leftToPray:leftToPray,
      nowPray:nowPray,
      nextPray:nextPray
    })


    InstallAnalytics()

    // setTimeout(() => {
    //   CallAds()
    // },60000)
  },[])

  return (
    <Layout style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../../../assets/backgrounds/background-home-min.jpg")}
        resizeMode="cover"
      >
          <View style={{ flex: 1, flexDirection: "column" }}>
            <View
              style={{
                flex: 1.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TopPanel />
            </View>
            <View style={{ flex: 1.3 }}>
              <MiddlePanel />
            </View>
            <View style={{ flex: 2 }}>
              <FooterPanel />
            </View>
          </View>
      </ImageBackground>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    prays:state.user.prays
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPray:item => dispatch(UserActions.setPray(item))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
