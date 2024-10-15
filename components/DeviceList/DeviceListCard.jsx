import { View, Text, Image } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'

export default function DeviceListCard({business}) {
  return (
    <View style={{
      padding:10,
      margin:10,
      borderRadius:10,
      backgroundColor:'white',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.8,
      shadowRadius: 2,
      display:'flex',
      flexDirection:'row',
      gap:10,
     
    }}> 
      <Image source={{uri:business.imageUrl}} style={{

        height:120,
        width:120,
        borderRadius:15,
      }}/>


      <View style={{
        flex:1,
        gap:5,
      }}>
        <Text style={{fontFamily:'flux-bold', fontSize:22}}>{business.name}</Text>
        <Text style={{fontFamily:'flux-medium', fontSize:15,color:Colors.GRAY}}>{business.location}</Text>
        <Text style={{fontFamily:'flux-medium', fontSize:15}}>{business.about}</Text>
      </View>
    </View>
  )
}