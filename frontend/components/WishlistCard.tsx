import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebaseConfig.js';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import SmallButton from './SmallButton';

export default function WishlistCard({ item, isRefresh, setIsRefresh }: any) {
  function deleteFromWishlist(userId: string, docId: string) {
    deleteDoc(doc(db, "users", userId, "wishlist", docId))
      .then(() => {
        setIsRefresh(!isRefresh)
      })
      .catch((error) => {
        console.error('Error deleting item: ', error);
      })
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <View style={styles.mainContainer}>
        <Image
          source={{uri: item.image}}
          resizeMode='contain'
          style={styles.image}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.price}>S${item.price}</Text>
          <View style={styles.ratingContainer}>
            {item.rating == "No ratings found"
             ? <Text style={styles.rating}>{item.rating}</Text>
             : <>
                 <AntDesign name="star" size={15} color="#ff6f00" style={styles.star} />
                 <Text style={styles.rating}>{item.rating} stars</Text>
               </>
            }
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>From: {item.platform}</Text>
            {item.sales !== "" && <Text style={styles.description}>{item.sales}</Text>}
            {item.delivery !== "" && <Text style={styles.description}>{item.delivery}</Text>}
          </View>
          <View style={styles.buttonsContainer}>
            <SmallButton
              title="Buy now!"
              onPress={() => Linking.openURL(item.url)
                            .catch((err) => console.error('Failed to open url', err))}
              containerStyle={{ width: 70, height: 31 }}
            />
            <Ionicons
              name="trash"
              size={23}
              color="red"
              onPress={() => {
                deleteFromWishlist(item.userId, item.docId)
              }
              }
            />
          </View>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: '#FBEAEB',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginTop: 6,
  },
  titleContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  title: {
    fontFamily: "semiBold",
    fontSize: 13,
    textAlign: "center",
  },
  mainContainer: {
    flexDirection: "row",
    width: "100%",
  },
  image: {
    width: "52%",
    height: 150,
    borderRadius: 2,
    alignSelf: 'center',
  },
  detailsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    padding: 2,
  },
  price: {
    fontFamily: "semiBold",
    color: "#c2185b",
    textAlign: 'center',
    lineHeight: 22,
  },
  ratingContainer: {
    flexDirection: "row",
  },
  star: {
    marginTop: 2,
  },
  rating: {
    fontFamily: "medium",
    marginLeft: 4,
    color: "#ff6f00",
    textAlign: "center",
  },
  descriptionContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
    gap: 2,
  },
  description: {
    fontSize: 12,
    fontFamily: "regular",
    lineHeight: 14,
    textAlign: "center"
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 14,
  },
});
