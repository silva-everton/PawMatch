import { arrayUnion, arrayRemove, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from './../config/FirebaseConfig';

const GetFavList = async (user) => {
  const docSnap = await getDoc(doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress));
  if (docSnap?.exists()) {
    return docSnap.data();
  } else {
    await setDoc(doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress), {
      email: user?.primaryEmailAddress?.emailAddress,
      favorites: [],
    });
    return { email: user?.primaryEmailAddress?.emailAddress, favorites: [] };
  }
};

const UpdateFav = async (user, favorites) => {
  const docRef = doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress);
  try {
    await updateDoc(docRef, {
      favorites: favorites,
    });
  } catch (e) {
    console.error("Error updating favorites:", e);
  }
};

// Use arrayUnion and arrayRemove for atomic operations
const AddToFav = async (user, petId) => {
  const docRef = doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress);
  try {
    await updateDoc(docRef, {
      favorites: arrayUnion(petId),
    });
  } catch (e) {
    console.error("Error adding favorite:", e);
  }
};

const RemoveFromFav = async (user, petId) => {
  const docRef = doc(db, 'UserFavPet', user?.primaryEmailAddress?.emailAddress);
  try {
    await updateDoc(docRef, {
      favorites: arrayRemove(petId),
    });
  } catch (e) {
    console.error("Error removing favorite:", e);
  }
};

// Export all functions
export default {
  GetFavList,
  UpdateFav,
  AddToFav,
  RemoveFromFav,
};

