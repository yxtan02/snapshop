import { useState } from "react";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { db } from '../firebaseConfig.js'
import { addDoc, collection, serverTimestamp } from "firebase/firestore"; 

function addToWishlist(userId : any, item : any) {
  addDoc(collection(db, 'users', userId, 'wishlist'), {
    ...item,
    createdAt: serverTimestamp()
  })
    .then((res) => {
      console.log(`Item added (id: ${res.id})`);
    })
    .catch((error) => {
      console.error('Error adding item: ', error);
    });
}

export default function LikeButton({ userId, item } : any) {
  const [liked, setLiked] = useState(false);

  return (
    <Pressable
      onPress={() => {
        setLiked((isLiked) => !isLiked)
        addToWishlist(userId, item)
      }}
    >
      <MaterialCommunityIcons
        name={liked ? "heart" : "heart-outline"}
        size={32}
        color={liked ? "red" : "black"}
      />
    </Pressable>
  );
};