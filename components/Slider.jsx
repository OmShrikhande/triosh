import React, { useEffect, useState } from 'react'
import { Text, View, FlatList, Image } from 'react-native'
import { db } from './../configs/FirebaseConfigs'
import { collection, query, getDocs } from '@firebase/firestore'

// Function to get slider list from Firestore database
export default function Slider() {

    const [SliderList,SetSliderList]=useState([]);

    useEffect(()=>{
        GetSliderList();
    },[])

    GetSliderList=async()=>{
        SetSliderList([]);
        const q= query(collection(db,'Sliders'))
        const querySnapshot= await getDocs(q)

        querySnapshot.forEach((doc)=>{
            console.log(doc.data())

            SetSliderList(prev=>[...prev,doc.data()])
            // You can use doc.data() to display slider list in your app. For example,
            // <SliderItem image={doc.data().image} /> in your SliderItem component.
        })

    }

 return (
   <View>
    <Text style={{
        fontFamily:'flux-bold',
        fontSize:20,
        paddingLeft:10,
        paddingTop:20,
        marginBottom:5,
 
    }}>
        #Wanna Add Data
    </Text>

    <FlatList
      data={SliderList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{
        paddingLeft:20
      }}
      renderItem={({item,index})=>(
        <Image source={{uri:item.image}}
            style={{
                height:160,
                width:300,
                marginBottom:10,
                borderRadius:15,
                marginRight:20,

            }}
        
        />
      )}

    />
 
   </View>
  )
}