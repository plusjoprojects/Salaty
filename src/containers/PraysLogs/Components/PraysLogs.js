import React from "react";
import { View, ScrollView } from "react-native";
import { Layout, Text,CheckBox } from "@ui-kitten/components";
import { Feather } from "@expo/vector-icons";
import { connect } from "react-redux";

import {Helper} from '../../../services'

let PraysLogs = (props) => {
  let {user} = props
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
        {user.todayLogs.fullList.map((trg,index) => (
          <DetailsPanelList text="الفجر" data={trg} key={index} />
        ))}
          <View style={{marginTop:90}}></View>
        </ScrollView>
      </View>
    );
  };
  let DetailsPanelList = (props) => {
    let { text, time,data } = props;
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
          <Text style={{ color: "white", fontSize: 16 }}>{Helper.fixPrayName(data.title)}</Text>
        </View>
        <View
          style={{
            paddingHorizontal: 5,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CheckBox checked={data.status == 0? false:true} status="success" />
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
    user:state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PraysLogs);