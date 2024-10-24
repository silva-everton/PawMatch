import { View, Text, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Colors from './../../constants/Colors';

export default function Header() {

    const {user}=useUser();
  return (
    <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        display: 'flex',
    }}>
      <View>      
        <Text style={{
            fontSize: 18,
            fontFamily: 'NunitoSans-Medium',
        }}>Welcome</Text>
        <Text style={{
            fontSize: 20,
            fontFamily: 'NunitoSans-Black',
            color: Colors.CORALPINK,
        }}>{user.fullName}</Text>
      </View> 
      <Image source={{uri:user?.imageUrl}} 
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        }}
        />


    </View>
  )
}