import React from 'react';
import { View,ImageBackground,TouchableOpacity } from 'react-native';
import { Layout,Text,Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {Feather} from '@expo/vector-icons'
import BottomSheet from "reanimated-bottom-sheet";
import EditUser from './Contents/EditUser'
import EditLocation from './Contents/EditLocation'
import EditNotification from './Contents/EditNotification'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageToken} from '../../constants'
let Settings = () => {
  let BottomSheetRef = React.useRef(null)
  let [page,setPage] = React.useState("EditUser")
  let end = () => {
    BottomSheetRef.current.snapTo(2)
  }
  let BottomContent = () => (
    <View style={{backgroundColor:'white',height:550}}>
      {page == "EditUser" && 
        <EditUser end={end} />
      }
      {page == "EditLocation" &&
      <EditLocation end={end} />
      }
      {page == "EditNotification" &&
        <EditNotification end={end} />
      }
    </View>
  )
    let DetailsPanelList = (props) => {
        let { text, icon,slug } = props;
        return (
          <TouchableOpacity
          onPress={() => {
            setPage(slug)
            BottomSheetRef.current.snapTo(1)
          }}
            style={{
              width: "100%",
              paddingVertical: 10,
              paddingHorizontal: 5,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              marginTop:4,
            }}
          >
            <View style={{ paddingHorizontal: 5,flexDirection:'row',alignItems:'center' }}>
            <Feather name={icon} style={{color:'white',fontSize:22}}></Feather>
            <View style={{width:5}}></View>
              <Text style={{ color: "white", fontSize: 16 }}>{text}</Text>
            </View>
            <View
              style={{
                paddingHorizontal: 5,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
            <Feather name="chevron-left" style={{color:'white',fontSize:20}}></Feather>
            </View>
          </TouchableOpacity>
        );
      };
     return(
         <Layout style={{flex:1}}>
            <ImageBackground style={{flex:1,paddingTop:'15%'}}
            source={require('../../assets/backgrounds/background-home-min.jpg')}
            resizeMode="cover"
            >
                <Text style={{color:'white',fontSize:22,textAlign:'left',margin:15}}>الأعدادات</Text>
                <View>
                    <DetailsPanelList slug="EditUser" text="تغير الأسم" icon="user"></DetailsPanelList>
                    <DetailsPanelList slug="EditLocation" text="المنطقة" icon="navigation"></DetailsPanelList>
                    <DetailsPanelList slug="EditNotification" text="الأشعارات" icon="bell"></DetailsPanelList>
                </View>
                <BottomSheet
                ref={BottomSheetRef}
                initialSnap={2}
                snapPoints={[550, 550, -100]}
                borderRadius={15}
                renderContent={BottomContent}
              />
            </ImageBackground>
         </Layout>
     )
}


const mapStateToProps = (state) => {
     return {
         
     }
};

const mapDispatchToProps = (dispatch) => {
     return {
         
     }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);