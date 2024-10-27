import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './../../config/FirebaseConfig';
import Colors from './../../constants/Colors';
import UserItem from '../../components/Inbox/UserItem';

export default function Inbox() {
  const { user } = useUser();
  const [userList, setUserList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    user && GetUserList();
  }, [user]);

  // Get user list depending on user's email
  const GetUserList = async () => {
    setLoader(true);
    setUserList([]);
    const q = query(
      collection(db, 'Chat'),
      where('userIds', 'array-contains', user?.primaryEmailAddress?.emailAddress)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserList((prevList) => [...prevList, doc.data()]);
    });
    setLoader(false);
  };

  // Filter the list of user in one state
  const MapOtherUserList = () => {
    const list = [];
    userList.forEach((record) => {
      const otherUser = record.users?.find(
        (chatUser) => chatUser?.email !== user?.primaryEmailAddress?.emailAddress
      );

      if (otherUser) {
        const result = {
          docId: record.id,
          ...otherUser,
        };
        list.push(result);
      }
    });

    return list;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>

      <FlatList
        data={MapOtherUserList()}
        refreshing={loader}
        onRefresh={GetUserList}
        style={styles.listContainer}
        renderItem={({ item, index }) => <UserItem userInfo={item} key={index} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 28,
    fontFamily: 'NunitoSans-Black',
    color: Colors.BLUE,
    textAlign: 'left',
    marginBottom: 10,
  },
  listContainer: {
    marginTop: 10,
  },
  separator: {
    height: 0.2,
    backgroundColor: Colors.GREY1,
    marginVertical: 5,
  },
});

