import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import PetListByCategory from '../../components/Home/PetListByCategory'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from './../../constants/Colors';


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

        {/* PetList + Category */}
        <PetListByCategory />

        {/* List of Pets */}

        {/* Add New Pet Option */}

        <TouchableOpacity style={styles.addNewContainer}>
          <MaterialIcons name="pets" size={24} color={Colors.BLUE}/> 
            <Text style={{
              fontSize: 18,
              fontFamily: 'NunitoSans-Black',
              color: Colors.BLUE,
            }}>Add New Pet </Text>
        </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  addNewContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 10,
    padding: 10,
    backgroundColor: Colors.TURQUOISE,
    borderWidth: 0.9,
    borderColor: Colors.BLUE,
    borderRadius: 10,
    borderStyle: 'dashed',
  }

})