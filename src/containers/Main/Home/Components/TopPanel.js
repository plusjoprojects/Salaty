import React from "react";
import { View,Text } from "react-native";
import { Layout,  } from "@ui-kitten/components";
import { connect } from "react-redux";
import {Helper} from '../../../../services'
import moment from 'moment'
let TopPanel = ({user}) => {
  let {leftToPray,nextPray} = user;
  let [nowString,setNowString] = React.useState("")
  React.useEffect(() => {

    let interval = true

    if(interval) {
      setInterval(() => {
        setNowString(moment().format('MMMM Do YYYY, h:mm:ss a'))
      },1000)
    }else {
      setNowString(moment().format('MMMM Do YYYY, h:mm:ss a'))
    }
    
    
  },[])
  return (
    <>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            textAlign: "center",
            fontFamily:'Cairo'
          }}
        >
          الصلاة القادمة: {Helper.fixPrayName(nextPray.text)}
        </Text>
        <Text style={{ color: "white", fontSize: 48, textAlign: "center" }}>
        {leftToPray}
        </Text>
        <Text style={{color:'white',fontSize:16,fontFamily:'Cairo'}}>
         {nowString}
        </Text>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(TopPanel);
