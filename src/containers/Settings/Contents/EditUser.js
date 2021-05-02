import React from 'react';
import { View } from 'react-native';
import { Layout,Text,Input,Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageToken} from '../../../constants'

let EditUser = (props) => {
    let [name,setName] = React.useState("")
    let installName = async() => {
        let name = await AsyncStorage.getItem(StorageToken.nameToken)
        if(name) {
            setName(name)
        }
    }
    React.useEffect(() => {
        installName()
    },[])
    let save = async() => {
        await AsyncStorage.setItem(StorageToken.nameToken,name)
        props.end()
    }
     return(
         <View style={{padding:16}}>
            <Text style={{color:'black',fontSize:24,textAlign:'left'}}>تعديل الأسم</Text>
            <View style={{marginTop:30}}>
                <Input label="الأسم" value={name} onChangeText={(val) => {setName(val)}} />
            </View>
            <View style={{marginTop:30}}>
                <Button onPress={save} status="success">حفظ</Button>
            </View>
         </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);