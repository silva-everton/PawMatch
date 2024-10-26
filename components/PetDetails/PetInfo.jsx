import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from './../../constants/Colors';
import MarkFav from './../../components/MarkFav';


export default function PetInfo({pet}) {
  return (
    <View>
      <Image source={{uri:pet.imageUrl}}
        style={{
            width: '100%',
            height: 400,
            borderRadius: 10,
            objectFit: 'cover',
        }}  
        />    
        <View style={{
            padding:20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <View>
                <Text style={{
                    fontSize: 27,
                    fontFamily: 'NunitoSans-Black',
                    color: Colors.BLUE,
                }}>{pet?.name}</Text>

                <Text style={{
                    fontSize: 14,
                    fontFamily: 'NunitoSans-Medium',
                    color: Colors.GREY1,
                }}>{pet?.address}</Text>
            </View>  
                <MarkFav pet={pet}/>
        </View>
    </View>
  )
}