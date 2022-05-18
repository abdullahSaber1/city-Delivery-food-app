import {collection, doc, getDocs, orderBy, query, setDoc} from 'firebase/firestore';
import {firebaseStore} from '../firebase.config';

export const saveNewFood = async (food) => {
  await setDoc(doc(firebaseStore, 'foodItems', `${Date.now()}`), food, {
    merge: true,
  });
};

export const getAllFoodItems = async () => {
  const foodItems = await getDocs(
    query(collection(firebaseStore, 'foodItems'), orderBy('id', 'desc'))
  );

  return foodItems.docs.map((doc) => doc.data());
};
