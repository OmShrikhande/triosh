import { View, Text } from 'react-native'
import React from 'react'

export default function AboutSection({device}) {
  return (
    <View style={{
      padding:20,
      backgroundColor:'#fff',
      // height:'100%'
  }}>
    <Text style={{
      fontFamily:'flux-bold',
      fontSize:25,
    }}>About</Text>

    <Text style={{
      fontFamily:'flux',
      lineHeight:24,
      fontSize:16
    }}>{device?.about}</Text>
  </View>
  )
}