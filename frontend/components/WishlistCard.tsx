import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
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
              containerStyle={{ width: "62%" }}
            />
            <Ionicons
              name="trash"
              size={23}
              color="red"
              onPress={() => deleteFromWishlist(item.userId, item.docId)}
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
    padding: 12,
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
  },
  image: {
    width: "52%",
    height: 135,
    borderRadius: 2,
  },
  detailsContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "48%",
    paddingLeft: 18,
    gap: 3,
  },
  price: {
    fontFamily: "semiBold",
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
  },
  others: {
    fontFamily: "light",
    fontSize: 12,
  },
  descriptionContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 3,
    gap: 2,
  },
  description: {
    fontSize: 14,
    fontFamily: "regular",
    lineHeight: 18,
    textAlign: "center"
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 8,
  },
});
