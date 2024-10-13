import { useNavigation } from 'expo-router'
import React, { useEffect } from 'react'
import { View,Text,Image } from 'react-native'
import { Colors } from '../../constants/Colors';
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { collection, db, getDoc } from 'firebase/firestore';


export default function AddDevice() {

    const navigation=useNavigation();

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Add New Device',
            headerShow:true,
           
        })
        GetCategoryList();
    },[])

    const onImagePick=async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,

            
          });
          console.log(result);
    }

    const GetCategoryList=async()=>{
        const q = query(collection(db, "Category"));
        const snapShot = await getDocs(q)

        snapShot.forEach((doc)=>{
            console.log(doc.data())})
        

    }
  return (
    <View style={{
        padding:20,
    }}>
        <Text style={{
            fontFamily:'flux-bold',
            fontSize:25,
        }}>Add New Device </Text>


        <Text style={{
            fontFamily:'flux',
            fontSize:16,
            color:Colors.GRAY,
        }}>Fill All Details in order to add new Device</Text>
    
    <TouchableOpacity style={{
        marginTop:20,
    }}
        onPress={()=>{onImagePick()}}

        >
        <Image source={require('../../assets/images/placeholder.png')}
        
        style={{
            width:100,
            height:100,
            marginBottom:20,
            resizeMode:'contain',
            borderRadius:100
        }}/>
    
    </TouchableOpacity>
   
        <View>
            <TextInput placeholder='Name'
                style={{
                    padding:15,
                    borderWidth:1,
                    borderRadius:5,
                    marginBottom:10,
                    borderColor:Colors.PRIMARY,
                    backgroundColor:'#fff',
                    fontFamily:'flux',
                    fontSize:16,
                }}
            />
            <TextInput placeholder='IP'
                style={{
                    padding:15,
                    borderWidth:1,
                    borderRadius:5,
                    marginBottom:10,
                    borderColor:Colors.PRIMARY,
                    backgroundColor:'#fff',
                    fontFamily:'flux',
                    fontSize:16,
                }}
            />
            <TextInput placeholder='Location'
                style={{
                    padding:15,
                    borderWidth:1,
                    borderRadius:5,
                    marginBottom:10,
                    borderColor:Colors.PRIMARY,
                    backgroundColor:'#fff',
                    fontFamily:'flux',
                    fontSize:16,
                }}
            />
            <TextInput placeholder='about'
            multiline
            numberOfLines={3}
                style={{
                    padding:15,
                    borderWidth:1,
                    borderRadius:5,
                    marginBottom:10,
                    borderColor:Colors.PRIMARY,
                    backgroundColor:'#fff',
                    fontFamily:'flux',
                    fontSize:16,
                }}
            />
        </View>
        <View>
        <RNPickerSelect
      onValueChange={(value) => console.log(value)}
      items={[
        { label: 'Football', value: 'football' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
      ]}
    />
        </View>

    </View>

    
  )
}
