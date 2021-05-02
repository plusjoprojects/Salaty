import React, { useState, useEffect } from "react";
import { Layout, Text, } from "@ui-kitten/components";
import { connect } from "react-redux";
import { StyleSheet, TouchableOpacity, View, Image,Dimensions } from "react-native";
import { Magnetometer } from "expo-sensors";
import LPF from "lpf";
let GetCompassDir = () => {
  LPF.init([]);
  LPF.smoothing = 0.2;
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  let [windowSize,setWindowSize] = React.useState({height:0,width:0,bottom:0})
  let [magnetometer, setMagnetometer] = React.useState("0");
  const [subscription, setSubscription] = useState(null);
  const _slow = () => {
    Magnetometer.setUpdateInterval(1000);
  };

  const _fast = () => {
    Magnetometer.setUpdateInterval(16);
  };

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((result) => {
        setData(result);
        setMagnetometer(fix(result.x, result.y));
      })
    );
    setTimeout(() => {
      _fast()
    },500)
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    let height = Dimensions.get("screen").height
    let width = Dimensions.get("screen").width
    setWindowSize({height:height / 2.2,width: width / 1.2,bottom:height / 20})
    return () => _unsubscribe();
  }, []);

  const { x, y, z } = data;
  let fix = (_x, _y) => {
    let angle = 0;
    if (Math.atan2(y, x) >= 0) {
      angle = Math.atan2(_y, _x) * (180 / Math.PI);
    } else {
      angle = (Math.atan2(_y, _x) + 2 * Math.PI) * (180 / Math.PI);
    }
    return Math.round(LPF.next(angle));
  };
  let _direction = (degree) => {
    if (degree >= 22.5 && degree < 67.5) {
      return "NE";
    } else if (degree >= 67.5 && degree < 112.5) {
      return "E";
    } else if (degree >= 112.5 && degree < 157.5) {
      return "SE";
    } else if (degree >= 157.5 && degree < 202.5) {
      return "S";
    } else if (degree >= 202.5 && degree < 247.5) {
      return "SW";
    } else if (degree >= 247.5 && degree < 292.5) {
      return "W";
    } else if (degree >= 292.5 && degree < 337.5) {
      return "NW";
    } else {
      return "N";
    }
  };
  let _degree = (magnetometer) => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };
  return (
    <View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
      <View style={{position:'absolute',left:0,bottom:0,alignItems:'center',justifyContent:'center',width:'100%',height:'100%'}}>
      <Image
          source={require("../../assets/others/qibla.png")}
          style={{
            width: windowSize.width,
            height: windowSize.height, // 295 + 312
            transform: [{ rotate: 295 + 312 - magnetometer + "deg" }],
            
          }}
          resizeMode="cover"
        />
      </View>
      
        <Image
          source={require("../../assets/others/compass.png")}
          style={{
            width: windowSize.width,
            height: windowSize.height,
            transform: [{ rotate: 90 - magnetometer + "deg" }],
          }}
          resizeMode="cover"
        />
        
      </View>
     
    </View>
  );
};
function round(n) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  text: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "stretch",
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
});

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(GetCompassDir);
