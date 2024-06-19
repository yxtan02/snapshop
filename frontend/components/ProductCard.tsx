import { Linking, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { doc, deleteDoc } from "firebase/firestore";
import { Rating } from '@kolking/react-native-rating';
import { db } from '../firebaseConfig.js'
import { Ionicons } from '@expo/vector-icons';

export default function ProductCard({ item, isRefresh, setIsRefresh }: any) {
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
    <View style={styles.container}>
      <Image
        source={{uri: item.image}}
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <View style={styles.ratingContainer}>
          <Rating
            size={15}
            rating={item.rating == "No ratings found" ? 0 : item.rating }
            disabled={true}/>
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
        <Text style={styles.others}>{item.others}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Ionicons
          name="trash"
          size={24}
          color="red"
          onPress={() => deleteFromWishlist(item.userId, item.docId)}
        />
        <Pressable
          onPress={() => Linking.openURL(item.url)
                           .catch((err) => console.error('Failed to open url', err))}
          style={styles.buyButton}
        >
          <Text style={styles.buyButtonText}>Buy now!</Text>
        </Pressable>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    marginBottom: 56,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  detailsContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  title: {
    fontFamily: "semiBold",
    fontSize: 14,
  },
  price: {
    fontFamily: "medium"
  },
  ratingContainer: {
    flexDirection: "row"
  },
  rating: {
    fontFamily: "regular",
    marginLeft: 12,
  },
  others: {
    fontFamily: "light",
    fontSize: 14,
  },
  buttonsContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  buyButton: {
    backgroundColor: '#00539C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 45,
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  buyButtonText: {
    fontFamily: "medium",
    fontSize: 16,
    color: "white"
  }
});
