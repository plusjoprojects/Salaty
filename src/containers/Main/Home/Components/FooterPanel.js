import React from "react";
import { View, ScrollView } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";
import * as Notifications from "expo-notifications";
import {Helper} from '../../../../services'
let FooterPanel = ({prays}) => {

  let GetNotificationTrigger = async () =>{
    let trigger = await Notifications.getAllScheduledNotificationsAsync()
    
  }
  React.useEffect(() => {
    GetNotificationTrigger()
  },[])
  let DetailsPanel = () => {
    let radius = 10;
    return (
      <View
        style={{
          flex: 1,
          marginTop: 7,
          borderTopLeftRadius: radius,
          borderTopRightRadius: radius,
          paddingTop: 5,
          borderLeftColor:'white',
          borderRightColor:'white',
          borderTopColor:'white',
          borderRightWidth:1,
          borderLeftWidth:1,
          borderTopWidth:1,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <DetailsPanelList text="الفجر" time={Helper.hour24to12(prays.fajr)} />
          <DetailsPanelList text="الضهر" time={Helper.hour24to12(prays.dhuhr)} />
          <DetailsPanelList text="العصر" time={Helper.hour24to12(prays.asr)} />
          <DetailsPanelList text="المغرب" time={Helper.hour24to12(prays.maghrib)} />
          <DetailsPanelList text="العشاء" time={Helper.hour24to12(prays.isha)} />
          <View style={{marginTop:90}}></View>
        </ScrollView>
      </View>
    );
  };
  let DetailsPanelList = (props) => {
    let { text, time } = props;
    return (
      <View
        style={{
          width: "100%",
          paddingVertical: 10,
          paddingHorizontal: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          marginTop:2,
        }}
      >
        <View style={{ paddingHorizontal: 5 }}>
          <Text style={{ color: "white", fontSize: 16 }}>{text}</Text>
        </View>
        <View
          style={{
            paddingHorizontal: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, marginHorizontal: 3 }}>
            {time}
          </Text>
          {/* <Feather name="bell" style={{ color: "white", fontSize: 22 }} /> */}
        </View>
      </View>
    );
  };
  return (
    <View style={{flex:1}}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={{ height: 1, width: "15%", backgroundColor: "white" }}
        ></View>
      </View>
      <DetailsPanel />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    prays:state.user.prays
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterPanel);
