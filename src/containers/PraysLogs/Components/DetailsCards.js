import React from "react";
import { View } from "react-native";
import { Layout, Text, useTheme } from "@ui-kitten/components";
import { connect } from "react-redux";
import { AnimatedCircularProgress } from "react-native-circular-progress";

let DetailsCards = (props) => {
  let { user } = props;
  let theme = useTheme();
  let [show, setShow] = React.useState(false);
  let FixPraysLogsFill = (from, done) => {
    let collect = done / from;
    collect = collect * 100;
    return collect;
  };

  React.useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 2000);
  }, []);
  let Card = ({ done, from, title }) => {
    return (
      <View
        style={{
          padding: 10,
          margin: 5,
          borderRadius: 10,
          flex: 1,
          borderColor: "white",
          borderWidth: 1,
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
      >
        <Text style={{ color: "white", textAlign: "left" }}>{title}</Text>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <AnimatedCircularProgress
            size={75}
            width={3}
            fill={FixPraysLogsFill(from, done)}
            tintColor={theme["color-primary-300"]}
            rotation={0}
            duration={500}
            backgroundColor={theme["color-primary-500"]}
          >
            {(fill) => (
              <Text style={{ color: "white" }}>
                {done}/{from}
              </Text>
            )}
          </AnimatedCircularProgress>
        </View>
      </View>
    );
  };
  return (
    <>
      <Text
        style={{
          color: "white",
          fontSize: 26,
          textAlign: "left",
          marginTop: 30,
          paddingHorizontal: 15,
        }}
      >
        سجل الصلاة
      </Text>
      {show && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Card
            done={user.todayLogs.done}
            title={"اليوم"}
            from={user.todayLogs.from}
          />
          <Card
            done={user.yesterdayLogs.done}
            from={user.yesterdayLogs.from}
            title={"الأمس"}
          />
        </View>
      )}
      {show && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Card
            done={user.lastSevenDayLogs.done}
            from={user.lastSevenDayLogs.from}
            title={"أخر 7 أيام"}
          />
          <Card done={user.last30Days.done}
            from={user.last30Days.from} title={"أخر 30 يوم"} />
        </View>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsCards);
