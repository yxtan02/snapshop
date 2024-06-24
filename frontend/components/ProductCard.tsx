import { Linking, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebaseConfig.js'
import { AntDesign, Ionicons } from '@expo/vector-icons';

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
    <View style={styles.cardContainer}>
      <View>
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View style={styles.deleteButtonContainer}>
            <Ionicons
              name="trash"
              size={23}
              color="red"
              onPress={() => deleteFromWishlist(item.userId, item.docId)}
            />
          </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: item.image}}
              resizeMode='contain'
              style={styles.image}
            />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.price}>{item.price}</Text>
            <View style={styles.ratingContainer}>
              <AntDesign name="star" size={15} color="#ffb300" style={styles.star}/>
              <Text style={styles.rating}>{item.rating}</Text>
            </View>
            <Text numberOfLines={2} style={styles.others}>{item.others}</Text>
            <View style={styles.buttonsContainer}>
              <Pressable
                onPress={() => Linking.openURL(item.url)
                                .catch((err) => console.error('Failed to open url', err))}
                style={styles.buyButton}
              >
                <Text style={styles.buyButtonText}>Buy now!</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    backgroundColor: '#FBEAEB',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 5,
    gap: 12,
  },
  container: {
    
  },
  headerContainer: {
    flexDirection: "row",
    marginBottom: 6,
  },
  titleContainer: {
    width: "92%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingLeft: 6
  },
  title: {
    fontFamily: "semiBold",
    fontSize: 13,
  },
  deleteButtonContainer: {
    width: "8%",
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  mainContainer: {
    flexDirection: "row",
    marginBottom: 1,
  },
  imageContainer: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 135,
    borderRadius: 10,
  },
  detailsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "50%",
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
  },
  others: {
    fontFamily: "light",
    fontSize: 13,
  },
  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    marginTop: 8,
  },
  buyButton: {
    backgroundColor: '#00539C',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 34,
    width: "62%",
    padding: 5,
  },
  buyButtonText: {
    fontFamily: "semiBold",
    fontSize: 11,
    color: "white",
  }
});
