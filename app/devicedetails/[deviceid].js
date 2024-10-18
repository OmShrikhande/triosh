import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfigs'
import Intro from '../../components/DeviceDetail/Intro'
import { Colors } from '../../constants/Colors'
import ActionButton from '../../components/DeviceDetail/ActionButton'
import AboutSection from '../../components/DeviceDetail/AboutSection'
import Reviews from '../../components/DeviceDetail/Reviews'


export default function DeviceId() {

    const {deviceid} = useLocalSearchParams();
    const [device,setDevice]=useState();
    const [loading,setLoading]=useState(false);


    const GetDeviceDetailsById=async()=>{
        setLoading(true)
        const docRef= doc(db, "Devices", deviceid)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setDevice({id:docSnap.id,...docSnap.data()});
            setLoading(false)
        } else {
            console.log("No such document!");
            setLoading(false)
        }
    }


    useEffect(()=>{
        GetDeviceDetailsById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
     },[])

  return (
    <ScrollView>
    {
    
            loading? <ActivityIndicator  size={'large'}
            color={Colors.PRIMARY}
            style={{
                marginTop:'65%',
            }}/>
            
            :
            
            
            <View>
                {/* Intro */}
                    <Intro device={device}/>
                
                
                {/* Action Buttons */}

                <ActionButton device={device}/>

                {/* About Sections */}
                <AboutSection device={device}/>

                {/* Review Section */}
                    <Reviews device={device}/>
            </View>
    }
  </ScrollView>
  )
}
