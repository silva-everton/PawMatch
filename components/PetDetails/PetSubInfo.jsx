import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from './../../constants/Colors';
import PetInfoCard from './PetInfoCard';


export default function PetSubInfo({pet}) {
  return (
    <View style={{
        paddingHorizontal: 20,       

    }}>
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            //justifyContent: 'space-between',
            //alignItems: 'center',
            //marginBottom: 20,
        }}>
         <PetInfoCard 
         icon={require('./../../assets/images/calendar.png')}
         title={'Age'}
         value={pet?.age+" Years"}
         />
         <PetInfoCard icon={require('./../../assets/images/bone.png')}
         title={'Breed'}
         value={pet?.breed}
         />     
        </View>

        <View style={{
            display: 'flex',
            flexDirection: 'row',
            //justifyContent: 'space-between',
            //alignItems: 'center',
            //marginBottom: 20,
        }}>
         <PetInfoCard 
         icon={require('./../../assets/images/sex.png')}
         title={'Sex'}
         value={pet?.sex}
         />
         <PetInfoCard icon={require('./../../assets/images/weight.png')}
         title={'Weight'}
         value={pet?.weight+" Kg"}
         />     
        </View>
    </View>
  )
}