import { View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../constants/Colors';

export default function PopularDeviceCard({ device }) {
  // Open IP address in Chrome
  const openInChrome = (ip) => {
    const url = `http://${ip}`; // Construct URL for opening in browser
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  return (
    <View style={styles.cardContainer}>
      {/* Display device image */}
      <Image
        source={{ uri: device?.imageUrl }}
        style={styles.deviceImage}
      />

      {/* Device details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.deviceName}>{device.name}</Text>
        <Text style={styles.deviceLocation}>{device.location}</Text>

        {/* Clickable IP address */}
        <TouchableOpacity onPress={() => openInChrome(device.IP)}>
          <Text style={styles.deviceIP}>IP: {device.IP}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    marginLeft: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  deviceImage: {
    width: 200,
    height: 130,
    borderRadius: 10,
  },
  detailsContainer: {
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 10,
    color: '#444',
  },
  deviceName: {
    fontFamily: 'flux-bold',
    fontSize: 17,
    color: '#212121',
    marginBottom: 5,
  },
  deviceLocation: {
    fontFamily: 'flux-bold',
    fontSize: 15,
    color: Colors.GRAY,
  },
  deviceIP: {
    fontFamily: 'flux-bold',
    fontSize: 16,
    color: '#1E90FF', // Make the IP blue to indicate it's clickable
    textDecorationLine: 'underline', // Underline to indicate clickable link
    marginTop: 5,
  },
});
