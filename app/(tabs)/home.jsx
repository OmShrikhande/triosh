import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import Slider from '../../components/Slider'
import Category from '../../components/Category'

export default function home() {
  return (
    <View>
     {/* Header */}
    <Header/>

     {/* Slider */}
     <Slider/>

     {/* Category */}
     <Category/>

     {/*popular business tabs*/}
    </View>
  )
}