import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import Colors from './../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function OwnerInfo({ pet }) {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image
          source={{ uri: pet?.userImage }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.username}>{pet?.username}</Text>
          <Text style={styles.role}>Pet Owner</Text>
        </View>
      </View>
      <Ionicons name="send-sharp" size={24} color={Colors.BLUE} style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    borderColor: Colors.BLUE,
    backgroundColor: Colors.WHITE,
    justifyContent: 'space-between',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 99,
  },
  textContainer: {
    flex: 1,
  },
  username: {
    fontSize: 17,
    fontFamily: 'NunitoSans-Black',
  },
  role: {
    fontSize: 16,
    fontFamily: 'NunitoSans-Bold',
    color: Colors.GREY1,
  },
  icon: {
    marginLeft: 10,
  },
});

