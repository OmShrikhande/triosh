import { View, Text, FlatList, Linking, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, updateDoc, deleteDoc, doc, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfigs'; // Adjust based on your file structure
import { Ionicons } from '@expo/vector-icons'; // For delete icon
import { useNavigation } from 'expo-router';
import { useUser } from '@clerk/clerk-expo'; // Clerk authentication hook

export default function AccessModeDevices() {
  const [accessDevices, setAccessDevices] = useState([]);
  const { user } = useUser(); // Get the logged-in user from Clerk
  const navigation = useNavigation();

  useEffect(() => {
    // Set navigation options
    navigation.setOptions({
      headerShow: true,
      headerTitle: 'My Devices',
  
    },[]);

    // Fetch devices associated with the logged-in user's email
    const fetchAccessDevices = async () => {
      if (user && user.primaryEmailAddress) {
        try {
          const userEmail = user.primaryEmailAddress.emailAddress;
          const q = query(collection(db, 'Devices'), where('userEmail', '==', userEmail));
          const querySnapshot = await getDocs(q);

          const devices = [];
          querySnapshot.forEach((doc) => {
            devices.push({ ...doc.data(), id: doc.id });
          });
          setAccessDevices(devices);
        } catch (error) {
          console.error('Error fetching devices:', error);
        }
      }
    };

    fetchAccessDevices();
  }, [user]); // Trigger effect when user changes

  // Function to open IP in Chrome and update the timestamp
  const openInChrome = async (deviceId, ip) => {
    const url = `http://${ip}`;

    // Open the IP in Chrome
    try {
      await Linking.openURL(url);
      console.log('Opening URL:', url);

      // Update the `lastUsed` timestamp in Firestore
      const deviceDocRef = doc(db, 'Devices', deviceId);
      await updateDoc(deviceDocRef, { lastUsed: new Date() });
      console.log(`Timestamp updated for device with IP: ${ip}`);
    } catch (error) {
      console.error('Failed to open URL or update timestamp:', error);
    }
  };

  // Function to delete device after confirmation
  const confirmDelete = (deviceId) => {
    Alert.alert(
      'Delete Device',
      'Are you sure you want to delete this device?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteDevice(deviceId) },
      ]
    );
  };

  // Function to delete the device from Firestore
  const deleteDevice = async (deviceId) => {
    try {
      await deleteDoc(doc(db, 'Devices', deviceId));
      setAccessDevices((prevDevices) => prevDevices.filter((device) => device.id !== deviceId));
      console.log(`Device with id: ${deviceId} deleted`);
    } catch (error) {
      console.error('Error deleting device:', error);
    }
  };

  const renderDeviceCard = ({ item }) => (
    <ImageBackground source={{ uri: item.imageUrl }} style={styles.cardBackground} blurRadius={10}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.deviceName}>{item.name}</Text>

          {/* Delete Icon */}
          <TouchableOpacity onPress={() => confirmDelete(item.id)}>
            <Ionicons name="trash-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={styles.deviceCategory}>Location: {item.location}</Text>
        <Text style={styles.deviceCategory}>Category: {item.category}</Text>
        <Text style={styles.deviceIP}>IP: {item.IP}</Text>

        {/* Button to trigger the IP in the browser */}
        <TouchableOpacity style={styles.triggerButton} onPress={() => openInChrome(item.id, item.IP)}>
          <Text style={styles.triggerButtonText}>Open IP</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Devices</Text>

      {/* Render FlatList to display devices */}
      <FlatList
        data={accessDevices}
        renderItem={renderDeviceCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }} // Padding at bottom
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  cardBackground: {
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#fff',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  deviceCategory: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
  },
  deviceIP: {
    fontSize: 16,
    color: '#1E90FF',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  triggerButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '30%',
  },
  triggerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
