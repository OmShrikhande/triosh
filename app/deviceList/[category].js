import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfigs';
import DeviceListCard from '../../components/DeviceList/DeviceListCard';
import { Colors } from '../../constants/Colors';
import { useUser } from '@clerk/clerk-expo';

export default function BusinessListByCategory() {

    const navigation=useNavigation();
    const {category} = useLocalSearchParams();
    const [businessList,setBusinessList]=useState([]);
    const [loading,setLoading]=useState(false);
    const {user}=useUser();


    useEffect(()=>{
        navigation.setOptions({
            headerShow:true,
            headerTitle: category, 
        })
        getBusinessList();
    },[])


    const getBusinessList=async()=>{
        setLoading(true)
        setBusinessList([])
        const q=query(collection(db, 'Devices'),where("category",'==',category),where('userEmail','==',user?.primaryEmailAddress?.emailAddress))

        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((docs)=>{
            console.log(docs.data())// map over the documents and render them here
            setBusinessList(prev=>[...prev,{id:docs?.id,...docs.data()}])
        })

        setLoading(false);
    }
  return (
    <View>
      {businessList?.length>0&&loading==false? 
      <FlatList
        refreshing={loading}
        onRefresh={getBusinessList}
        data={businessList}
        renderItem={({item,index})=>(
            <DeviceListCard business={item} key={index}/>
     )}
    
     
      />:
      loading?<ActivityIndicator
        size={'large'}
        color={Colors.PRIMARY}

        style={{
            marginTop:'65%',
        }}
      
      />:
        <Text style={{
            textAlign:'center',
            marginTop:'80%',
            fontSize:20,
            fontFamily:'flux',
            color:Colors.GRAY,
        }}>No Device Found </Text>
      }
    </View>
  )
}