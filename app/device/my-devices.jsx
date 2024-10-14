import { View, Text, FlatList, Linking, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfigs'; // Adjust based on your file structure
import { Ionicons } from '@expo/vector-icons'; // For delete icon (you can use any icon package)

export default function AccessModeDevices() {
  const [accessDevices, setAccessDevices] = useState([]);

  useEffect(() => {
    // Fetch devices with type 'Access Mode'
    const fetchAccessDevices = async () => {
      const q = query(collection(db, 'Devices'));
      const querySnapshot = await getDocs(q);

      const devices = [];
      querySnapshot.forEach((doc) => {
        devices.push({ ...doc.data(), id: doc.id });
      });
      setAccessDevices(devices);
    };

    fetchAccessDevices();
  }, []);

  // Function to open IP in Chrome and update the timestamp
  const openInChrome = async (deviceId, ip) => {
    const url = `http://${ip}`;

    // Open the IP in Chrome
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));

    // Update the `lastUsed` timestamp in Firestore
    try {
      const deviceDocRef = doc(db, 'Devices', deviceId);
      await updateDoc(deviceDocRef, {
        lastUsed: new Date() // Update with the current timestamp
      });
      console.log(`Timestamp updated for device with IP: ${ip}`);
    } catch (error) {
      console.error('Error updating timestamp:', error);
    }
  };

  // Function to delete device after confirmation
  const confirmDelete = (deviceId) => {
    // Show a confirmation dialog before deletion
    Alert.alert(
      'Delete Device',
      'Are you sure you want to delete this device?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteDevice(deviceId),
        },
      ]
    );
  };

  // Function to delete the device from Firestore
  const deleteDevice = async (deviceId) => {
    try {
      await deleteDoc(doc(db, 'Devices', deviceId));
      setAccessDevices(accessDevices.filter((device) => device.id !== deviceId));
      console.log(`Device with id: ${deviceId} deleted`);
    } catch (error) {
      console.error('Error deleting device:', error);
    }
  };

  const renderDeviceCard = ({ item }) => (
    <ImageBackground 
      source={{ uri: item.imageUrl }} // Fetching image from Firestore
      style={styles.cardBackground}
       // Optional: style for the image to cover properly
    >
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.deviceName}>{item.name}</Text>

          {/* Delete Icon */}
          <TouchableOpacity onPress={() => confirmDelete(item.id)}>
            <Ionicons name="trash-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.deviceCategory}>Location: {item.location}</Text>
        <Text style={styles.deviceIP}>IP: {item.IP}</Text>

        {/* Button to trigger the IP in the browser */}
        <TouchableOpacity
          style={styles.triggerButton}
          onPress={() => openInChrome(item.id, item.IP)}
        >
          <Text style={styles.triggerButtonText}>Open IP</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Devices</Text>

      {/* Rendering data using cards */}
      <FlatList
        data={accessDevices}
        renderItem={renderDeviceCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }} // Adds padding at the bottom of the list
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa', // Light background color for contrast
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
    overflow: 'hidden', // To ensure rounded corners for the background image
  },
  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for better text visibility
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
    color: '#fff', // White text for category
    marginBottom: 10,
  },
  deviceIP: {
    fontSize: 16,
    color: '#1E90FF', // Blue color for clickable IP
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  triggerButton: {
    backgroundColor: '#1E90FF', // Primary color for the button
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '30%', // Smaller button size
  },
  triggerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
