import { useNavigation } from 'expo-router'
import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfigs';  // Ensure the correct path

export default function MyDevices() {
  // Getting user details
  const { user } = useUser();
  const [deviceList,setDeviceList]=useState([]);
  const navigation=useNavigation();

  // Fetching user devices on component mount or user change
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'My Devices',
      headerShow:true,
  })
    if (user) {
      GetUserDevice();
    }
  }, [user]);

  // Fetching user devices
  const GetUserDevice = async () => {
    try {

      setDeviceList([]);
      // Create query to match user email
      const q = query(collection(db, 'Devices'), where('userEmail', '==', user?.primaryEmailAddress?.emailAddress));
      const querySnapshot = await getDocs(q);

      // Displaying device details in console.log
      querySnapshot.forEach((doc) => {
        console.log(doc.data());  // Corrected 'doc' access

        setDeviceList(prev=>[...prev,{id:doc.id,...doc.data()}])
      });
    } catch (error) {
      console.error('Error fetching devices: ', error);
    }
  };

  

  return (
    <View style={{ padding: 20 }}>
      <Text
        style={{
          fontFamily: 'flux-bold',
          fontSize: 35,
          color: '#212121',
        }}>
        My Devices
      </Text>


      <FlatList 
      data={deviceList}
      renderItem={({item,index})=>(
       <DeviceListCard device={item} key={index}/>
      )}/>
    </View>
  );
}
