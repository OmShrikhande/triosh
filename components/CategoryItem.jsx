import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

export default function CategoryItem({category,onCategoryPress}) {
  return (

    <TouchableOpacity onPress={()=>onCategoryPress(category)}>
        <View style={{padding:15, 
            backgroundColor:Colors.PRIMARY,
            borderRadius:99,
            justifyContent:'center',
            alignItems:'center',
            shadowColor:Colors.BLACK,
            shadowOffset:{width:0,height:2},  
            marginRight:15
        }}>
            <Image source={{uri:category.icon}} style={{width:40,height:40}}/>        
        </View>

        <Text style={{fontSize:13,
            fontFamily:'flux-medium',
            textAlign:'center',
            marginTop:5,
         }}>{category.name}</Text>
    </TouchableOpacity>
  )
}