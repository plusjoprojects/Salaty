import React from "react";
import { View, ImageBackground } from "react-native";
import {
  Layout,
  Text,
  Select,
  SelectItem,
  IndexPath,
  Button,
  useTheme
} from "@ui-kitten/components";
import { connect } from "react-redux";
import country from '../../../assets/data/country.json'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {StorageToken} from '../../../constants'

let SelectCountry = (props) => {
  
  let [countryIndex, setCountryIndex] = React.useState(new IndexPath(0));
  let [coords,setCoords] = React.useState({latitude:0,longitude:0})
  React.useEffect(() => {
      setCoords({
        latitude:country[countryIndex.row][1],
        longitude:country[countryIndex.row][2]
      })
  },[])
  let Next = async() => {
    let location = {coords:coords}
    await AsyncStorage.setItem(StorageToken.locationToken,JSON.stringify(location))
    props.navigation.navigate("FullSetup")
  }
  let theme = useTheme()
  return (
    <Layout style={{ flex: 1 }} level="1">
      <ImageBackground
        style={{ flex: 1, justifyContent: "center" }}
        source={require("../../../assets/backgrounds/background-loading-min.jpg")}
        resizeMode="cover"
      >
        <Text
          style={{
            fontSize: 30,
            color: "white",
            marginHorizontal: 15,
            textAlign: "left",
          }}
        >
          قم بأختيار منطقتك
        </Text>
        <View
          style={{
            marginTop: 21,
            paddingHorizontal: 15,
          }}
        >
          <Select
            label="الدولة"
            selectedIndex={countryIndex}
            onSelect={(index) => {
              setCountryIndex(index);
              setCoords({
                latitude:country[index.row][1],
                longitude:country[index.row][2]
              })
            }}
            value={country[countryIndex.row][3]}
          >
          {country.map((trg,index) => (
            <SelectItem title={trg[3]} key={index}></SelectItem>
          ))}
          </Select>
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectCountry);
