import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import Colors from './../../constants/Colors';


export default function LoginScreen() {
  return (
    <View style={{
      backgroundColor:Colors.WHITE,
      height: '100%',

    }}>
      <Image source={require('./../../assets/images/login.png')}
      style={{
        width: '100%',   
        height: '65%',     
      }}
      />

     <View style={{
        padding: 20,
        display: 'flex',         
        alignItems: 'center',
     }}>
        <Text style={{
          fontSize: 30,
          textAlign: 'center',
          color: 'black',
          fontFamily: 'NunitoSans-Black',
          color: Colors.PRIMARY,
          
        }}> Ready to make a new Friend? </Text>
        <Text style={{
          fontSize: 18,
          textAlign: 'center',
          fontFamily: 'NunitoSans-ExtraBold',
          color: Colors.CORALPINK,
          marginTop: 10,
        }}>
          Let's adopt the pet which you like and make their life happy again
        </Text>
        
        <Pressable style={{
          backgroundColor: Colors.PRIMARY,
          padding: 10,
          borderRadius: 15,
          marginTop: 30,
          width: '100%',
        }}>
          <Text style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 20,
            fontFamily: 'NunitoSans-Black',
          }}> Get Started </Text>
        </Pressable>

      </View>

    </View>
  )
}