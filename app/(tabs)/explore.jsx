import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfigs'; // Adjust based on your file structure
import { Colors } from '../../constants/Colors';
import { useUser } from '@clerk/clerk-expo';
export default function Explore() {
  const [devices, setDevices] = useState([]); // All devices
  const [searchQuery, setSearchQuery] = useState(''); // Search input
  const [filteredDevices, setFilteredDevices] = useState([]); // Filtered based on search
  const [suggestions, setSuggestions] = useState([]); // Suggestions for similar input
  const {user}=useUser();
  // Fetch devices on component mount
  useEffect(() => {
    const fetchDevices = async () => {
      const q = query(collection(db, 'Devices'),where('userEmail',"==",user?.primaryEmailAddress?.emailAddress));
      const querySnapshot = await getDocs(q);
      const fetchedDevices = [];

      querySnapshot.forEach((doc) => {
        fetchedDevices.push({ ...doc.data(), id: doc.id });
      });

      setDevices(fetchedDevices);
      setFilteredDevices(fetchedDevices); // Initially show all devices
    };

    fetchDevices();
  }, []);

  // Search function to filter devices
  const handleSearch = (query) => {
    setSearchQuery(query);

    // If query is empty, show all devices
    if (query === '') {
      setFilteredDevices(devices);
      setSuggestions([]);
      return;
    }

    // Convert query to lowercase to make the search case-insensitive
    const lowercasedQuery = query.toLowerCase();

    const results = devices.filter((device) =>
      device.name.toLowerCase().includes(lowercasedQuery) ||
      device.location.toLowerCase().includes(lowercasedQuery) ||
      device.IP.toLowerCase().includes(lowercasedQuery)
    );

    setFilteredDevices(results);

    // If no results found, generate suggestions and limit to 5
    if (results.length === 0) {
      const suggestionResults = devices.filter((device) =>
        device.name.toLowerCase().startsWith(lowercasedQuery.charAt(0)) ||
        device.location.toLowerCase().startsWith(lowercasedQuery.charAt(0)) ||
        device.IP.toLowerCase().startsWith(lowercasedQuery.charAt(0))
      );

      // Limit suggestions to first 5 results
      setSuggestions(suggestionResults.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  // Function to open IP in Chrome
  const openInChrome = (ip) => {
    const url = `http://${ip}`;
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

  // Render device card
  const renderDeviceCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.deviceName}>{item.name}</Text>
      <Text style={styles.deviceCategory}>Location: {item.location}</Text>
      <Text style={styles.deviceIP}>IP: {item.IP}</Text>

      {/* Button to trigger the IP in browser */}
      <TouchableOpacity
        style={styles.triggerButton}
        onPress={() => openInChrome(item.IP)}
      >
        <Text style={styles.triggerButtonText}>Open IP</Text>
      </TouchableOpacity>
    </View>
  );

  // Render suggestion card
  const renderSuggestionCard = ({ item }) => (
    <View style={styles.suggestionCard}>
      <Text style={styles.suggestionText}>Did you mean: {item.name}?</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Page heading */}
      <Text style={styles.heading}>Explore</Text>

      {/* Search bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name, location, or IP"
        value={searchQuery}
        onChangeText={(text) => handleSearch(text)}
      />

      {/* Show filtered devices */}
      <FlatList
        data={filteredDevices}
        renderItem={renderDeviceCard}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <Text style={styles.noResultsText}>No devices found</Text>
        )}
      />

      {/* Show suggestions if no results found */}
      {filteredDevices.length === 0 && suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          renderItem={renderSuggestionCard}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <Text style={styles.suggestionHeader}>Suggestions</Text>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f6f8',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',    
    marginBottom: 20,
    marginTop:10,
  },
  searchInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    borderColor: Colors.PRIMARY,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  deviceName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  deviceCategory: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  deviceIP: {
    fontSize: 16,
    color: '#1E90FF',
    marginBottom: 10,
  },
  triggerButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  triggerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#757575',
    marginTop: 20,
  },
  suggestionCard: {
    backgroundColor: '#eaeaea',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  suggestionText: {
    fontSize: 16,
    color: '#555',
  },
  suggestionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
