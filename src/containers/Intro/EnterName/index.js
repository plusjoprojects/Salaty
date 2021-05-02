import React from "react";
import { View, ImageBackground, TextInput } from "react-native";
import { Layout, Text, useTheme, Button } from "@ui-kitten/components";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageToken } from "../../../constants";

let EnterName = (props) => {
  let theme = useTheme();

  let [name, setName] = React.useState("");

  let Next = async () => {
    // Store Name To Storage
    await AsyncStorage.setItem(StorageToken.nameToken, name);
    // Navigation => navigate to "SetupPermissions"
    props.navigation.navigate("SetupPermissions");
  };
  return (
    <Layout style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1, justifyContent: "center" }}
        source={require("../../../assets/backgrounds/background-loading-min.jpg")}
        resizeMode="cover"
      >
        <Text
          style={{
            fontSize: 30,
            color: "white",
            textAlign: "left",
            marginHorizontal: 15,
          }}
        >
          قم بإدخال أسمك
        </Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <TextInput
            style={{
              borderBottomColor: theme["color-primary-500"],
              borderBottomWidth: 3,
              width: "75%",
              backgroundColor: "rgba(55, 59, 108, 0.02)",
              paddingVertical: 12,
              color: "white",
              fontSize: 22,
              paddingHorizontal: 5,
              textAlign: "center",
              borderRadius: 5,
            }}
            autoCapitalize={"characters"}
            placeholder="الأسم"
            value={name}
            onChangeText={(val) => {
              setName(val);
            }}
          ></TextInput>
        </View>
        <View
          id="BottomButton"
          style={{ position: "absolute", left: 0, bottom: 0, width: "100%" }}
        >
          <Button
            status="primary"
            onPress={Next}
            style={{
              backgroundColor: theme["color-primary-300"],
              borderRadius: 0,
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,
              borderColor: theme["color-primary-400"],
            }}
          >
            التالي
          </Button>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(EnterName);
