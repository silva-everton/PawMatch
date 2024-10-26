import { Pressable, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Shared from './../Shared/Shared';
import { useUser } from '@clerk/clerk-expo';

export default function MarkFav({ pet, color = 'black', onUpdateFavorites }) {
  const { user } = useUser();
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    user && GetFav();
  }, [user]);

  const GetFav = async () => {
    try {
      const result = await Shared.GetFavList(user);
      setFavList(result?.favorites ? result.favorites : []);
    } catch (error) {
      console.error('Error getting favorites:', error);
    }
  };

  const AddToFav = async () => {
    if (!favList.includes(pet.id)) {
      // Optimistic Update: Assume addition will succeed
      const updatedFavList = [...favList, pet.id];
      setFavList(updatedFavList);
      onUpdateFavorites && onUpdateFavorites(); // Immediately update parent component

      try {
        await Shared.AddToFav(user, pet.id);
      } catch (error) {
        console.error('Error adding to favorites:', error);
        // Rollback if addition fails
        const rollbackFavList = favList.filter((id) => id !== pet.id);
        setFavList(rollbackFavList);
      }
    }
  };

  const removeFromFav = async () => {
    if (favList.includes(pet.id)) {
      // Optimistic Update: Assume removal will succeed
      const updatedFavList = favList.filter((item) => item !== pet.id);
      setFavList(updatedFavList);
      onUpdateFavorites && onUpdateFavorites(); // Immediately update parent component

      try {
        await Shared.RemoveFromFav(user, pet.id);
      } catch (error) {
        console.error('Error removing from favorites:', error);
        // Rollback if removal fails
        setFavList((prevList) => [...prevList, pet.id]);
      }
    }
  };

  return (
    <View>
      {favList?.includes(pet.id) ? (
        <Pressable onPress={removeFromFav}>
          <Ionicons name="heart" size={30} color="red" />
        </Pressable>
      ) : (
        <Pressable onPress={AddToFav}>
          <Ionicons name="heart-outline" size={30} color={color} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});


