import { useState } from "react";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { db } from '../firebaseConfig.js'
import { addDoc, collection, serverTimestamp } from "firebase/firestore"; 
import { doc, deleteDoc } from "firebase/firestore";

let hashmap: any = {}

function addToWishlist(userId : any, item : any) {
  let docId = "test"
  addDoc(collection(db, 'users', userId, 'wishlist'), {
    ...item,
    createdAt: serverTimestamp()
  })
    .then((res) => {
      console.log(`Item added (id: ${res.id})`);
      hashmap[item.title] = res.id
      console.log(hashmap)
    })
    .catch((error) => {
      console.error('Error adding item: ', error);
    });
}

function deleteFromWishlist(userId: string, docId : string) {
  deleteDoc(doc(db, "users", userId, "wishlist", docId))
    .then(() => {
      // setIsRefresh(!isRefresh)
    })
    .catch((error) => {
      console.error('Error deleting item: ', error);
    })
}

export default function LikeButton({ userId, item } : any) {
  const [liked, setLiked] = useState(false);

  return (
    <Pressable
      onPress={() => {
        setLiked((isLiked) => !isLiked)
        console.log(item)
        if (liked) {
          deleteFromWishlist(userId, hashmap[item.title])
        } else {
          addToWishlist(userId, item)
        }
      }}
    >
      <MaterialCommunityIcons
        name={liked ? "heart" : "heart-outline"}
        size={30}
        color={liked ? "red" : "black"}
      />
    </Pressable>
  );
};