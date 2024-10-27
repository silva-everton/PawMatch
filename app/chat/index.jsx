import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useCallback, } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { doc, getDoc, addDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from './../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { GiftedChat } from 'react-native-gifted-chat'
import moment from 'moment/moment';


export default function ChatScreen() {

  const params=useLocalSearchParams();
  //console.log(params);
  const navigation=useNavigation();
  const {user}=useUser();
  const [messages, setMessages] = useState([])

  useEffect(() => {
    GetUserDetails();
    const unsubscribe = onSnapshot(
      collection(db, 'Chat', params?.id, 'messages'),
      (snapshot) => {
        const messageData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            _id: doc.id,
            ...data,
            createdAt: data?.createdAt instanceof Date
              ? data.createdAt
              : data?.createdAt?.toDate 
                ? data.createdAt.toDate()
                : new Date(), // Fallback to current date if createdAt is missing or invalid
          };
        });
        setMessages(messageData);
      }
    );
    return () => unsubscribe();
  }, []);  
  
  

  const GetUserDetails=async()=>{
    const docRef=doc(db,'Chat',params?.id);
    const docSnap=await getDoc(docRef);

    const result=docSnap.data();
    console.log(result);
    const otherUser=result?.users.filter(item=>item.email!=user?.primaryEmailAddress?.emailAddress);
    console.log(otherUser);
    navigation.setOptions({
      headerTitle: otherUser[0].name
    })

  }

  const onSend = async (newMessage) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessage));
    
    // Set createdAt to the current date as a Date object
    newMessage[0].createdAt = new Date();
  
    await addDoc(collection(db, 'Chat', params.id, 'messages'), newMessage[0]);
  };
  
  


  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      showUserAvatar={true}
      user={{
        _id: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        avatar: user?.imageUrl
      }}
    />
  )
}

const styles = StyleSheet.create({})