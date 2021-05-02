import React from "react";
import { View, ImageBackground, Alert,Linking,Platform } from "react-native";
import { Layout, Text, useTheme, Spinner, Button } from "@ui-kitten/components";
import { connect } from "react-redux";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { StorageToken } from "../../../constants";
import NotificationPermissions from "./NotificationPermissions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LocationPermission from "./LocationPermissions";
import Constants from "expo-constants";
import * as IntentLauncher from "expo-intent-launcher";
let SetupPermissions = (props) => {
  const pkg = Constants.manifest.releaseChannel
    ? Constants.manifest.android.package
    : "host.exp.exponent";
  const openAppSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      IntentLauncher.startActivityAsync(
        IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
        { data: "package:" + pkg }
      );
    }
    setShowBottomButton(true)
  };
  let [fill, setFill] = React.useState(0);
  let [showBottomButton, setShowBottomButton] = React.useState(false);
  let [permissionsType, setPermissionsType] = React.useState(
    "اعدادات الإشعارات"
  );
  let theme = useTheme();

  let Install = async () => {
    let token = await NotificationPermissions.GetPermissionsAndToken();
    await AsyncStorage.setItem(StorageToken.notificationToken, token);
    setFill(50);
    setTimeout(() => {
      setPermissionsType("اعدادات الموقع");
    }, 1000);
    let {
      location,
      status,
    } = await LocationPermission.GetLocationPermissionsAndCoords();
    await AsyncStorage.setItem(
      StorageToken.locationToken,
      JSON.stringify(location)
    );
    setFill(100);
    setTimeout(() => {
      if (status == 1) {
        props.navigation.navigate("FullSetup");
      } else {
        Alert.alert(
          "الرجاء تشغيل تحديد الموقع",
          "في حال عدم تشغيل الموقع سوف يتطلب الأمر أختيار المنطقة",
          [
            {
              text: "التالي",
              onPress: () => {
                props.navigation.navigate("SelectCountry");
              },
            },
            {
              text: "الأعدادات",
              onPress: () => {
                openAppSettings();
              },
            },
          ]
        );
      }
    }, 1000);
  };

  React.useEffect(() => {
    if(Platform.OS == 'web') {
      props.navigation.navigate("SelectCountry");
    }else {
      Install();

    }
  }, []);

  return (
    <Layout style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1, justifyContent: "center" }}
        source={require("../../../assets/backgrounds/background-loading-min.jpg")}
        resizeMode="cover"
      >
        <Text
          style={{
            color: "white",
            fontSize: 30,
            textAlign: "left",
            marginHorizontal: 15,
          }}
        >
          اعداد الصلاحيات
        </Text>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 26,
          }}
        >
          <AnimatedCircularProgress
            size={160}
            width={15}
            fill={fill}
            tintColor={theme["color-primary-500"]}
            rotation={0}
            duration={1000}
            backgroundColor={theme["color-primary-300"]}
          >
            {(fill) => (
              <Text style={{ color: "white" }}>{fill.toFixed(2)}%</Text>
            )}
          </AnimatedCircularProgress>
          <Text style={{ color: "white", fontSize: 16 }}>
            {permissionsType}
          </Text>
          <Spinner />
        </View>
        {showBottomButton && (
          <View
            style={{ position: "absolute", left: 0, bottom: 0, width: "100%" }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <Button style={{ borderRadius: 0,flex:1 }} onPress={Install} status="info">
                اعادة المحاولة
              </Button>
              <Button
                style={{
                  borderRadius: 0,
                  backgroundColor: "black",
                  color: "white",
                  flex:1
                }}
                onPress={() => {navigation.navigate("SelectCountry")}}
              >
                التالي
              </Button>
            </View>
          </View>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(SetupPermissions);
