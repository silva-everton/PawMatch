import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from './../../constants/Colors';
import { useRouter } from 'expo-router';
import MarkFav from './../../components/MarkFav';


export default function PetListItem({pet}) {

  const router=useRouter();

  return (
    <TouchableOpacity
    //this is to fetch the pet info the user passes from this section to the pet-details page
    onPress={() => router.push({
        pathname:'/pet-details',
        params:pet
    })}
    
    style={{
        marginRight: 15,
        //marginTop: 20,
        padding: 5,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
    }}>

      <View style={{
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 100,
      }}>
        <MarkFav pet={pet} color={'white'}/>
      </View>
      <Image source={{uri:pet?.imageUrl}}
        style={{
          width: 170,
          height: 135,
          borderRadius: 10,
          objectFit: 'cover',
        }}
        />
        <Text style={{
            fontSize: 18,
            fontFamily: 'NunitoSans-Bold',
            marginTop: 10,
            
        }}>{pet?.name}</Text>
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <Text style={{
                //fontSize: 16,
                fontFamily: 'NunitoSans-Bold',
                color: Colors.BLUE,
            }}>{pet?.breed}</Text>
            <Text style={{
                fontSize: 12,
                fontFamily: 'NunitoSans-Medium',
                paddingHorizontal: 7,
                borderRadius: 10,
                color: Colors.CORALPINK,
            }}>{pet?.age} YRS </Text>
        </View>
    </TouchableOpacity>
  )
}