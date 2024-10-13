import { useUser } from '@clerk/clerk-expo'
import React from 'react'
import { Text,View, Image } from 'react-native';

export default function UserIntro() {

    const {user}=useUser();


  return (
    <View style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        backgroundColor:'#f8f9fa',
        shadowColor: '#000',
        marginTop:30
    }}>
        <Image source={{uri:user?.imageUrl}}
        style={{
            width:100,
            height:100,
            borderRadius:99
        }}/>

        <Text
            style={{
                fontFamily:'flux-bold',
                fontSize:20,
                marginTop:10,
                color:'#343a40'
            }}
        >{user?.fullName}</Text>
        <Text
            style={{
                fontFamily:'flux',
                fontSize:16,
                marginTop:5,
                color:'#6c757d'
            }}
        >{user?.primaryEmailAddress?.emailAddress}</Text>
    </View>
  )
}
