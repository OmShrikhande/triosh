import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Rating } from 'react-native-ratings'
import { Colors } from './../../constants/Colors'

export default function Reviews({device}) {

  const [rating,setRating] = useState(4);
  const [userInput,setUserInput] = useState([])
  const onsubmit=()=>{

  }

  return (
    <View style={{
        padding:20,
        backgroundColor:'#fff',
        height:'100%'
    }}>
      <Text style={{
        fontFamily:'flux-bold',
        fontSize:25,
      }}>Reviews</Text>

      <View>
<Rating
  showRating={false}
  imageSize={20}
  onFinishRating={(rating)=>{setRating(rating)}}
  style={{ paddingVertical: 10 }}
/>
      <TextInput
        numberOfLines={3}
        onChangeText={(value)=>
          setUserInput(value)
        }
      style={{
          fontFamily:'flux',
          fontSize:16,
          borderWidth:1,
          padding:10,
          borderColor: '#ccc',
          borderRadius:5,
          marginBottom:10,
          backgroundColor:'#fff',
          width:'100%',
          textAlignVertical:'top'
        }}
      placeholder='Here u can give review!!' />

      <TouchableOpacity
      disabled={!userInput}
      onPress={()=>onsubmit()}
        style={{
          padding:10,
          backgroundColor:Colors.PRIMARY,
          borderRadius:5,
          marginTop:10,
        }}
      >
        <Text  style={{
          fontFamily:'flux-medium',
          fontSize:16,
          textAlign:'center'
          }}>Submit</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}