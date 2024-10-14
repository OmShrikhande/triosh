import { View, Text, Image } from 'react-native';
import React from 'react';

export default function PopularDeviceCard({ Devices }) {
  return (
    <View style={{ padding: 10,marginLeft:20,backgroundColor:'#fff',borderRadius:15 }}>
     <Image source={{uri:Devices?.image}} 
     style={{
        width: 200,
        height: 130,
        borderRadius:10,
     }}/>


     <View style={{
        fontSize:17,
        fontWeight:'bold',
        marginTop:10,
        marginBottom:5,
        marginLeft:10,
        color:'#444'
     }}>
        <Text>{Devices.name} </Text>
     </View>
    </View>
  );
}
