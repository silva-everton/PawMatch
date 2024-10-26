import { Pressable, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Shared from './../Shared/Shared';
import { useUser } from '@clerk/clerk-expo';

export default function MarkFav({ pet, color = 'black' }) {
  const { user } = useUser();
  const [favList, setFavList] = useState();

  useEffect(() => {
    user && GetFav();
  }, [user]);

  const GetFav = async () => {
    const result = await Shared.GetFavList(user);
    console.log(result);
    setFavList(result?.favorites ? result.favorites : []);
  };

  const AddToFav = async () => {
    if (!favList.includes(pet.id)) {
      await Shared.AddToFav(user, pet.id); // Use AddToFav from Shared
      GetFav(); // Refresh the favorites list
    }
  };

  const removeFromFav = async () => {
    if (favList.includes(pet.id)) {
      await Shared.RemoveFromFav(user, pet.id); // Use RemoveFromFav from Shared
      GetFav(); // Refresh the favorites list
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
