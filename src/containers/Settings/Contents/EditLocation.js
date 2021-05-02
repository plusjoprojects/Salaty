import React from "react";
import { View } from "react-native";
import { Layout, Text, Button, Spinner } from "@ui-kitten/components";
import { connect } from "react-redux";
import LocationPermissions from "../../../containers/Intro/SetupPermissions/LocationPermissions";
import InstallDB from "../../../containers/Intro/FullSetup/InstallDB";
import PraysTimeHandler from "../../../containers/Intro/FullSetup/InstallPraysTime";
import InstallPraysLogs from "../../../containers/Intro/FullSetup/InstallPraysLogs";
import SetupNotification from "../../../containers/Intro/FullSetup/SetupNotification";

let EditLocation = (props) => {
  let [loading, setLoading] = React.useState(false);

  let ChangeLocation = async () => {
    setLoading(true);
    await LocationPermissions.GetLocationPermissionsAndCoords();
    await InstallDB.CreateDB();
    await PraysTimeHandler.InstallPraysTime();
    InstallPraysLogs.CreatePraysLogs();
    await SetupNotification.setupNotificationAsync();
    setLoading(false);
    props.end();
  };

  return (
    <View style={{ padding: 15, position: "relative", height: 550 }}>
      {loading && (
        <View
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            left: 0,
            top: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner></Spinner>
        </View>
      )}

      <Text style={{ color: "black", fontSize: 24, textAlign: "left" }}>
        تغير المنطقة
      </Text>
      <View style={{ marginTop: 15 }}>
        <Button onPress={ChangeLocation} status={"info"} disabled={loading ? true:false}>
          تحديد الموقع
        </Button>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLocation);
