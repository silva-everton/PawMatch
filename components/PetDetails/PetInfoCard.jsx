import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from './../../constants/Colors';

export default function PetInfoCard({icon, title, value}) {
  return (
    <View style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: Colors.WHITE,
        padding: 5,
        borderRadius: 10,
        margin: 5,
        flex: 1,

    }}>
        <Image source={icon}
        style={{
            width: 40,
            height: 40,
        }}
        />
        <View style={{
            flex:1,
        }}>
            <Text style={{
                fontSize: 16,
                fontFamily: 'NunitoSans-Bold',
                color: Colors.GREY1,                 
            }}>{title}</Text>
            <Text style={{
                fontSize: 14,
                fontFamily: 'NunitoSans-Bold',
                //color: Colors.GREY1,
            }}>{value}</Text>
        </View>
    </View>      
  )
}