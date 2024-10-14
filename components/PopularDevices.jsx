import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../constants/Colors';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../configs/FirebaseConfigs';
import PopularDeviceCard from './PopularDeviceCard';

export default function DeviceList() {
  const [deviceList, setDeviceList] = useState([]);

  useEffect(() => {
    GetDeviceList();
  }, []);

  const GetDeviceList = async () => {
    setDeviceList([]); // Reset the list before fetching new data
    const q = query(collection(db, 'DeviceList'), limit(10));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setDeviceList((prev) => [...prev, doc.data()]);
    });
  };

  return (
    <View>
      <View
        style={{
          display: 'flex',
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'flux-bold',
            fontWeight: 'bold',
          }}
        >
          Popular Devices
        </Text>

        <Text style={{ color: Colors.PRIMARY }}>View all</Text>
      </View>

      {/* Corrected FlatList data prop */}
      <FlatList
      horizontal={true}
        data={deviceList} // Changed from DeviceList to deviceList
        renderItem={({ item, index }) => (
          <PopularDeviceCard Devices={item} key={index} />
        )}
        // keyExtractor={(item, index) => index.toString()} // Ensure each item has a unique key
      />
    </View>
  );
}
