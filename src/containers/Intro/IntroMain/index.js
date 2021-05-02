import React from 'react';
import { View,ImageBackground,Image } from 'react-native';
import { Layout,Text,useTheme,Button } from '@ui-kitten/components';
import { connect } from 'react-redux';


let IntroMain = (props) => {
     let theme = useTheme()
     return(
         <Layout style={{flex:1}}>
          <ImageBackground 
          source={require('../../../assets/backgrounds/background-loading-min.jpg')}
          style={{flex:1,justifyContent:'center',alignItems:'center',position:'relative'}}
          resizeMode="cover"
          >
               <Image source={require('../../../assets/others/man_prayer_fixed.png')} style={{width:175,height:175}} resizeMode="contain" />
               <View id="Content">
                    <Text style={{fontFamily:'Cairo',color:theme['color-primary-800'],fontSize:32,textAlign:'center'}}>صلاتي</Text>
                    <View style={{width:100,height:2,backgroundColor:theme['color-primary-800'],marginTop:5}}></View>
               </View>
               <View id="Content2" style={{paddingHorizontal:'5%'}}>
                    <Text style={{color:'white',fontSize:14,marginTop:25,textAlign:'center'}}>يضم التطبيق العديد من المميزات التي تساعدك على الألتزام في الصلاة, منها تذكيرك في مواعيد الصلاة على حسب المنطقة التي تتواجد فيها , ويمكنك تسجيل الصلاة التي قمت بها , لتتابع مدا التزامك في الأيام السابقة ويقوم البرنامج بتذكيرك بقبل الصلاة التالية للتذكير, مع العديد من المميزات</Text>
               </View>
               <View id="BottomButton" style={{position:'absolute',left:0,bottom:0,width:'100%'}}>
                    <Button status="primary" onPress={() => {props.navigation.navigate("EnterName")}} style={{backgroundColor:theme['color-primary-300'],borderRadius:0,borderTopRightRadius:5,borderTopLeftRadius:5,borderColor:theme['color-primary-400']}}>أبدا</Button>
               </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(IntroMain);