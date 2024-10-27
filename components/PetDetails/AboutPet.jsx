import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import Colors from './../../constants/Colors';

export default function AboutPet({pet}) {
    const [readMore, setReadMore] = useState(true);

  return (  
    <View style={{
        padding: 20,
      
    }}>
      <Text style={{
        fontSize: 20,
        fontFamily: 'NunitoSans-Black',
        color: Colors.BLUE,
      }}>About {pet?.name}</Text>
      <Text numberOfLines={ readMore?3:20} style={{
        fontSize: 14,
        fontFamily: 'NunitoSans-Medium',
        color: Colors.GREY1,        
        textAlign: 'justify',
        
      }}>{pet.about} </Text>
     {readMore && 
     <Pressable onPress={()=>setReadMore(false)} >
        <Text style={{
            fontSize: 14,
            fontFamily: 'NunitoSans-Bold',
            color: Colors.GREY1,
            textDecorationLine: 'underline',
            marginTop: 10,
        }}>Read More</Text>
     </Pressable>}
        {!readMore &&
        <Pressable onPress={()=>setReadMore(true)} >
            <Text style={{
                fontSize: 14,
                fontFamily: 'NunitoSans-Bold',
                color: Colors.GREY1,
                textDecorationLine: 'underline',
                marginTop: 10,
            }}>Read Less</Text>
        </Pressable>}
    </View>
  )
}