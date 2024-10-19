import { View, Text, Image, ToastAndroid, ActivityIndicator, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { collection, getDocs, query, setDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../configs/FirebaseConfigs';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';
import { useNavigation } from 'expo-router';

export default function AddDevice() {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const { user } = useUser();
  const [deviceName, setDeviceName] = useState();
  const [DeviceIP, setDeviceIP] = useState();
  const [DeviceLocation, setDeviceLocation] = useState();
  const [AboutDevice, setAboutDevice] = useState();
  const [DeviceCategory, setDeviceCategory] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add New Device',
      headerShow: true,
    });
    GetCategoryList();
  }, []);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    setImage(result?.assets[0].uri);
    console.log(result);
  };

  const GetCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, 'Category'));
    const snapShot = await getDocs(q);

    snapShot.forEach((doc) => {
      setCategoryList((prev) => [
        ...prev,
        {
          label: doc.data().name,
          value: doc.data().name,
        },
      ]);
    });
  };

  const onAddNewDevice = async () => {
    setLoading(true);
    const filename = Date.now().toString();
    const resp = await fetch(image);
    const blob = await resp.blob();
    const imageref = ref(storage, 'Images/' + filename);

    uploadBytes(imageref, blob)
      .then(() => {
        console.log('image uploaded');
      })
      .then(() => {
        getDownloadURL(imageref).then(async (downloadUrl) => {
          console.log(downloadUrl);
          saveDeviceDetails(downloadUrl);
        });
      });

    setLoading(false);
  };

  const saveDeviceDetails = async (imageUrl) => {
    try {
      const timestamp = Date.now(); // Generate the current timestamp
      await setDoc(doc(db, 'Devices', timestamp.toString()), {
        name: deviceName,
        IP: DeviceIP,
        location: DeviceLocation,
        about: AboutDevice,
        category: DeviceCategory,
        image: user?.imageUrl ?? '', // Ensure no null values
        username: user?.fullName ?? '',
        userEmail: user?.primaryEmailAddress?.emailAddress ?? '', // Corrected
        imageUrl: imageUrl ?? '', // Ensure no null values
        createdAt: new Date(), // Store the timestamp in the backend
      });
      ToastAndroid.show('New Device added Successfully', ToastAndroid.LONG);
    } catch (error) {
      console.error('Error adding document: ', error);
      ToastAndroid.show('Failed to add device. Please try again.', ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1, padding: 20 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100} // Adjust if needed for proper space
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{ fontFamily: 'flux-bold', fontSize: 25 }}>Add New Device</Text>
          <Text style={{ fontFamily: 'flux', fontSize: 16, color: Colors.GRAY }}>
            Fill All Details in order to add new Device
          </Text>

          <TouchableOpacity style={{ marginTop: 20 }} onPress={onImagePick}>
            {!image ? (
              <Image
                source={require('../../assets/images/placeholder.png')}
                style={{
                  width: 100,
                  height: 100,
                  marginBottom: 20,
                  resizeMode: 'contain',
                  borderRadius: 100,
                }}
              />
            ) : (
              <Image
                source={{ uri: image }}
                style={{
                  width: 100,
                  height: 100,
                  marginBottom: 20,
                  resizeMode: 'contain',
                  borderRadius: 100,
                }}
              />
            )}
          </TouchableOpacity>

          <View>
            <TextInput
              placeholder="Name"
              onChangeText={(v) => setDeviceName(v)}
              style={styles.input}
            />
            <TextInput
              placeholder="IP"
              onChangeText={(v) => setDeviceIP(v)}
              style={styles.input}
            />
            <TextInput
              placeholder="Location"
              onChangeText={(v) => setDeviceLocation(v)}
              style={styles.input}
            />
            <TextInput
              placeholder="About"
              onChangeText={(v) => setAboutDevice(v)}
              multiline
              numberOfLines={3}
              style={styles.input}
            />
          </View>

          <View style={styles.pickerContainer}>
            <RNPickerSelect onValueChange={(value) => setDeviceCategory(value)} items={categoryList} />
          </View>

          <TouchableOpacity
            disabled={loading}
            style={styles.addButton}
            onPress={onAddNewDevice}
          >
            {loading ? (
              <ActivityIndicator size={'large'} color={'#fff'} />
            ) : (
              <Text style={styles.addButtonText}>Add New Device</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = {
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: Colors.PRIMARY,
    backgroundColor: '#fff',
    fontFamily: 'flux',
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: Colors.PRIMARY,
    backgroundColor: '#fff',
    fontFamily: 'flux',
    fontSize: 16,
  },
  addButton: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginTop: 20,
  },
  addButtonText: {
    textAlign: 'center',
    fontFamily: 'flux-bold',
    color: '#fff',
    fontSize: 18,
  },
};
