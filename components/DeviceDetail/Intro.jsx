import { View, Image, Text } from 'react-native';
import React, { useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';

export default function Intro({ device }) {
    const navigation = useNavigation(); // Typed navigation

    useEffect(() => {
        // Hide the header when this screen is active
        navigation.setOptions({
          headerShown: false, // Hide the header
        });
    }, [navigation]);

    // Conditional rendering to check if the device data is available
    if (!device) {
        return null; // Render nothing or a loading state if device is undefined
    }

    return (
        <View>
            <View
                style={{
                    position: 'absolute',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: 20,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-circle" size={40} color="white" />
                </TouchableOpacity>

                <FontAwesome6 name="heart" size={30} color="white" />
            </View>

            <Image
                source={{ uri: device.imageUrl }}
                style={{
                    height: 240,
                    width: '100%',
                }}
            />

            <View style={{ padding: 20,
                justifyContent: 'center',
                backgroundColor: 'white',
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                marginTop: -10,
             }}>
                <Text style={{ fontSize: 35, fontFamily:'flux-bold',  }}>
                    {device.name || 'Unknown Device'}
                </Text>
                <Text style={{ fontSize: 18,fontFamily:'flux' }}>
                    {device.location || 'Unknown Location'}
                </Text>
            </View>
        </View>
    );
}
