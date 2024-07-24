import { useState } from "react";
import { Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { db } from '../firebaseConfig.js'
import { addDoc, collection, serverTimestamp } from "firebase/firestore"; 
import { doc, deleteDoc } from "firebase/firestore";

let hashmap: any = {}

async function fetchCategory(item: any) {
  const url = `https://real-time-amazon-data.p.rapidapi.com/product-details?asin=${item.id}&country=SG`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '6c5d16a2a6msh7b40979d839fcc2p1a8a65jsn16c3a43c4b50',
      'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log("test " + result["data"]["category_path"])
    return result["data"]["category_path"]
  } catch (error) {
    console.error(error);
    return []
  }
}

async function addToWishlist(userId : any, item : any) {
  let category = []
  if (item.platform == "amazon") {
    category = await fetchCategory(item)
  }

  addDoc(collection(db, 'users', userId, 'wishlist'), {
    ...item,
    category: category,
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