import React from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import { Colors } from '../../constants/Colors'
import { TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
export default function MenuList() {
    const menulist=[
        {
        id:1,
        name:'Add Device',
        icon:require('../../assets/images/add.png'),
        path:'/device/add-device'
        },
        
        {
            id:2,
            name:'Share App',
            icon:require('../../assets/images/share.png'),
            path:'/device/my-devices'
        },
        
        {
            id:3,
            name:'My Devices',
            icon:require('../../assets/images/add.png'),
            path:'/device/my-devices'
        },
        
        {
            id:4,
            name:'Logout',
            icon:require('../../assets/images/Logout.png'),
            path:''
        },

]

const router = useRouter();

const onMenuClick=(item)=>{router.push(item.path)}

  return (
    <View>
        <FlatList
            data={menulist}
            numColumns={2}
            renderItem={({item,index})=>(

                <TouchableOpacity

                    onPress={()=>onMenuClick(item)}
                    style={{
                        display:'flex',
                        flexDirection:'row',
                        alignItems:'center',
                        gap:10,
                        padding:10,
                        flex:1,
                        height:100,
                        borderRadius:15,
                        borderWidth:1,
                        margin:10,
                        borderColor:Colors.PRIMARY
                    }}
                >
                    <Image source={item.icon}
                    style={{
                        width:50,
                        height:50,                     
                    }}
                    />

                    <Text
                        style={{
                            fontFamily:'flux-medium',
                            fontSize:16,
                           flex:1
                        }}
                    >{item.name}</Text>

                </TouchableOpacity>
            )}
        />

        <Text
            style={{
                fontSize:18,
                fontFamily:'flux-bold',
                color:Colors.PRIMARY,
                marginVertical:80,
                textAlign:'center'
            }}
        >
            Made with ❤️ by Om Shrikhande </Text>
           
       
    </View>
  )
}
