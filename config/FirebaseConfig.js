// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pawmatch-865ad.firebaseapp.com",
  projectId: "pawmatch-865ad",
  storageBucket: "pawmatch-865ad.appspot.com",
  messagingSenderId: "1066267434382",
  appId: "1:1066267434382:web:3145e12f3007ff947958df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);