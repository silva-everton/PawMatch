import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import Shared from './../../Shared/Shared';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './../../config/FirebaseConfig';
import Colors from './../../constants/Colors';
import MarkFav from './../../components/MarkFav';
import { useFocusEffect, useRouter } from 'expo-router';

export default function Favorites() {
  const { user } = useUser();
  const router = useRouter(); // Use this for navigation with Expo Router
  const [favList, setFavList] = useState([]);
  const [favPets, setFavPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        fetchFavorites();
      }
    }, [user])
  );

  // Fetch user's favorite list
  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const favData = await Shared.GetFavList(user);
      const favorites = favData?.favorites || [];
      setFavList(favorites);
      fetchFavoritePets(favorites);
    } catch (error) {
      console.error('Error fetching favorite list:', error);
      setLoading(false);
    }
  };

  // Fetch favorite pet details based on favorite pet IDs
  const fetchFavoritePets = async (favoriteIds) => {
    if (favoriteIds.length === 0) {
      setFavPets([]);
      setLoading(false);
      return;
    }

    try {
      const q = query(collection(db, 'Pets'), where('id', 'in', favoriteIds));
      const querySnapshot = await getDocs(q);
      const pets = [];
      querySnapshot.forEach((doc) => {
        pets.push(doc.data());
      });
      setFavPets(pets);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
    setLoading(false);
  };

  // Navigate to pet details
  const handlePetPress = (pet) => {
    // Navigate to the PetDetails page and pass the pet data as query parameters
    router.push({
      pathname: '/pet-details',
      params: { ...pet }, // Pass the entire pet object as query parameters
    });
  };

  // Render a pet card for each favorite pet
  const renderPetCard = ({ item }) => (
    <Pressable onPress={() => handlePetPress(item)}>
      <View style={styles.petCard}>
        <Image source={{ uri: item.imageUrl }} style={styles.petImage} />
        <View style={styles.petDetails}>
          <Text style={styles.petName}>{item.name}</Text>
          <Text style={styles.petBreed}>{item.breed}</Text>
          <MarkFav pet={item} color="red" onUpdateFavorites={fetchFavorites} />
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favourite Pets</Text>
      {loading ? (
        <ActivityIndicator size="large" color={Colors.TURQUOISE} />
      ) : favPets.length > 0 ? (
        <FlatList
          data={favPets}
          renderItem={renderPetCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noFavoritesText}>You don't have any favourite pets yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.TURQUOISE,
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: 'NunitoSans-Black',
    color: Colors.WHITE,
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  petCard: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: Colors.GREY1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  petImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  petDetails: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  petName: {
    fontSize: 20,
    fontFamily: 'NunitoSans-Black',
    color: Colors.BLUE,
  },
  petBreed: {
    fontSize: 16,
    fontFamily: 'NunitoSans-Medium',
    color: Colors.GREY1,
  },
  noFavoritesText: {
    fontSize: 18,
    fontFamily: 'NunitoSans-Black',
    color: Colors.CORALPINK,
    textAlign: 'center',
    marginTop: 20,
  },
});