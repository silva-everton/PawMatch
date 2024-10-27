import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import Colors from './../../constants/Colors';

export default function Category({category}) {

    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory,setSelectedCategory]=useState();
    useEffect(()=>{
        GetCategories();
    },[])

    /**
     * Used to get Category List from DB 
     */

    const GetCategories=async()=>{
        setCategoryList([]);
        const snapshot = await getDocs(collection(db,'Category'));
        snapshot.forEach(doc=>{
            
            setCategoryList(categoryList=>[...categoryList,doc.data()])
        })
    }

  return (
    <View style={{
        marginTop: 20,
    }}>
      <Text style={{
        fontSize: 20,        
        fontFamily: 'NunitoSans-ExtraBold',
      }}>Category</Text>
    
    <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({item,index})=>(
            <TouchableOpacity 
                onPress={()=>{                
                    setSelectedCategory(item.name);
                    category(item.name)
                }}          
            style={{
                flex: 1,
            }}>
                <View style={[styles.container,
                   selectedCategory==item.name&&styles.selectedCategoryContainer]}>
                    <Image source={{uri:item?.imageUrl}}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 100,
                    }}
                    />
                </View>
                <Text style={{
                    textAlign: 'center',
                    fontFamily: 'NunitoSans-ExtraBold',
                    color: Colors.BLUE,
                }}>{item?.name}</Text>
            </TouchableOpacity>
        )} 
       />   

    </View>
  )
}

const styles = StyleSheet.create({
    container: {      
        backgroundColor: Colors.TURQUOISE,
        padding: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.BLUE,      
        margin: 5,
    }, 
    selectedCategoryContainer: {
        backgroundColor: Colors.BLUE,
        borderColor: Colors.TURQUOISE, 
    }
})