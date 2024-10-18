import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Redirect, useNavigation } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient for the background
import { Colors } from '@/constants/Colors';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation(); // Typed navigation

  useEffect(() => {
    // Hide the header when this screen is active
    navigation.setOptions({
      headerShown: false, // Hide the header
    });

    // Set a timeout for 1 second before redirecting
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Delay of 1 second (1000ms)

    // Clean up the timer
    return () => clearTimeout(timer);
  }, [navigation]);

  if (!isLoading) {
    // Once loading is finished, redirect to the home page
    return <Redirect href={'/home'} />;
  }

  return (
    <LinearGradient
      colors={['#7F57F1', '#FF6F61', '#FCE38A']} // Gradient colors
      style={styles.container}
    >
      {/* Replace this with your own cool graphic, logo, or animation */}
      <Image
        source={require('../assets/images/image.png')} // Make sure to replace with your logo path
        style={styles.logo}
      />
      <Text style={styles.appName}>{Colors.Appname}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius:20,
  },
  appName: {
    fontSize: 40, // Larger font size for the app name
    fontFamily:'flux-bold',
    color: '#FFFFFF', // White color for the app name
    letterSpacing: 2, // More spaced letters for a cool effect
    textTransform: 'uppercase', // Uppercase text
  },
});
