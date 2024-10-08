import { Text, StyleSheet, View,Image, TextInput } from 'react-native'
import React, { Component } from 'react'
import { useUser } from '@clerk/clerk-expo'
import {Colors} from '../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header(){
  
const {user}= useUser();


    return (
      <View style={{
        padding:20,
        paddingTop:40,
        backgroundColor:Colors.PRIMARY,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
       
      }}>
        <View style={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            gap:10
        }}>
            <Image  source={{uri:user?.imageUrl}} 
                style={{
                    width:45,
                    height:45,
                    borderRadius:99
                }}
            
            />

            <View>
                <Text style={{color:'white'}}>Welcome,</Text>
                <Text style={{fontSize:19,fontFamily:'flux-medium',color:'white'}}>{user?.fullName}</Text>
            </View>

        </View>

            {/* Search Bar */}
        <View style={{
            display:'flex',
            flexDirection:'row',
            gap:10,
            alignItems:'center',
            backgroundColor:'#fff',
            padding:10,
            margin:10,
            borderRadius:33
        }}>
            <Ionicons name="search" size={24} color="black" />
            <TextInput placeholder='Search...' 
                style={{
                    fontFamily:'flux',
                    fontSize:16,
                    
                }}/>   
        </View>
      </View>
    )
  
}

const styles = StyleSheet.create({})