import { View, Text, FlatList, Image, Linking } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';


export default function ActionButton({device}) {

  if (!device) {
    console.log('devide not found')
    return null; // Render nothing or a loading state if device is undefined
}
  const actionButtonMenu=[
    
    {
      id:1,
      name:'Location',
      icon:require('./../../assets/images/location.png'),
      url:'https://www.google.com/maps/search/?api=1&query='+device.location
    },
    {
      id:2,
      name:'Share',
      icon:require('./../../assets/images/sharecolor.png'),
      url:'https://www.google.com/maps/search/?api=1&query='+device.location
    },
]
  const OnPressHandle=(item)=>{
    if(item.name=='share'){

      return ;
    }
    Linking.openURL(item?.url)
  }
  return (
    <View style={{
      backgroundColor:'#fff',
      padding:10
    }}>
    
      <FlatList
      numColumns={2}     
      columnWrapperStyle={{justifyContent: 'space-around'}}
      data={actionButtonMenu}
      renderItem={({item,index})=>(

        <TouchableOpacity style={{
          display:'flex',
          flexDirection:'',
          alignItems:'center',
          gap:10
        }}
          key={index}
          onPress={()=>OnPressHandle(item)}
        >
          <Image source={item?.icon} style={{
            
            width:50,
            height:50,
            borderRadius:25,
            borderWidth:2,
            borderColor:index%2===0?'#ddd':'#ccc'
          
          }}/>
          <Text style={{
            fontSize:16,
            fontFamily:'flux-medium',
            textAlign:'center',
            marginTop:3,            
          }}>{item.name}</Text>
      
        </TouchableOpacity>
      )}
      />
    </View>
  )
}
