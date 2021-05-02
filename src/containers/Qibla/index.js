import React from "react";
import { View, ImageBackground, Image } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { connect } from "react-redux";

import GetCompassDir from './GetCompassDir'

let Qibla = () => {
  return (
    <Layout style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1,paddingTop:'15%' }}
        source={require("../../assets/backgrounds/background-home-min.jpg")}
        resizeMode="cover"
      >
        <Text
          style={{
            color: "white",
            fontSize: 22,
            textAlign: "left",
            margin: 15,
          }}
        >
          أتجاه القبلة
        </Text>

        {/* <View
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={require("../../assets/others/compass.png")}
            style={{ width: 300, height: 300 }}
            resizeMode="cover"
          />
        </View> */}
        <GetCompassDir />
      </ImageBackground>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Qibla);
