import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'

export default function Home() {
  return (
    <View style={{
      padding: 20,
      marginTop: 50,
    }}>
        {/* Header */}

        <Header />

        {/* Slider */}

        <Slider />

        {/* Category */}

        {/* List of Pets */}

        {/* Add New Pet Option */}


    </View>
  )
}