import { View, Text, FlatList, Linking, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../constants/Colors';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'; // Added orderBy
import { db } from '../configs/FirebaseConfigs';
import PopularDeviceCard from './PopularDeviceCard';

export default function DeviceList() {
  const [deviceList, setDeviceList] = useState([]);

  useEffect(() => {
    GetDeviceList();
  }, []);

  // Fetch most recent devices ordered by a 'lastUsed' timestamp or any other recent usage field
  const GetDeviceList = async () => {
    setDeviceList([]);
    const q = query(
      collection(db, 'Devices'),
      orderBy('lastUsed', 'desc'), // Assuming 'lastUsed' is the field that stores recent activity
      limit(4)
    );
    const querySnapshot = await getDocs(q);

    const devices = [];
    querySnapshot.forEach((doc) => {
      devices.push({ ...doc.data(), id: doc.id });
    });
    setDeviceList(devices);
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
          Recently Used Devices
        </Text>

        <Text style={{ color: Colors.PRIMARY }}>View all</Text>
      </View>

      {/* Horizontal scrolling list for recently used devices */}
      <FlatList
        horizontal={true}
        data={deviceList}
        renderItem={({ item }) => <PopularDeviceCard device={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}