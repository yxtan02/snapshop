import { Linking, Image, StyleSheet, Text, View } from 'react-native';
import LikeButton from './LikeButton';
import SmallButton from './SmallButton';
import { AntDesign } from '@expo/vector-icons';
import { setDoc, getDoc, doc } from "firebase/firestore";
import { router } from 'expo-router';
import { db } from '../firebaseConfig.js';

export default function ProductCardVertical({ item, userId, containerStyle }: any) {
  async function addToDb(item: any) {
    // check if product is already stored in db
    const docSnap = await getDoc(doc(db, 'products', item.id))

    // add product to db if it is not stored yet
    if (!docSnap.exists()) {
      try {
        await setDoc(doc(db, 'products', item.id), item);
        console.log(`Item added (id: ${item.id})`);
      } catch (error) {
        console.error('Error adding item: ', error);
      }
    }

    // navigate to product page
    router.navigate(`/snap/result/${item.id}`);
  }
  
  return (
    <View style={[styles.cardContainer, containerStyle]}>
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
          <View style={styles.buttonContainer}>
            <SmallButton
              title="Reviews"
              onPress={() => addToDb(item)}
              containerStyle={{...styles.button, backgroundColor: '#FB6542', marginLeft: 54}}
            />
            <SmallButton
              title="Buy now!"
              onPress={() => Linking.openURL(item.url)
                            .catch((err) => console.error('Failed to open url', err))}
              containerStyle={{ width: 72, height: 33 }}
            />
            <LikeButton userId={userId} item={item} />
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
    backgroundColor: '#FBEAEB',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    width: "100%",
  },
  titleContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "semiBold",
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 2,
  },
  mainContainer: {
    flexDirection: "row",
    width: "100%",
  },
  image: {
    width: "52%",
    height: 198,
    borderRadius: 2,
    alignSelf: 'center',
  },
  detailsContainer: {
    width: "48%",
    padding: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    fontFamily: "semiBold",
    fontSize: 17,
    color: "#c2185b",
    textAlign: 'center',
    lineHeight: 26
  },
  ratingContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  star: {
    marginBottom: 3
  },
  rating: {
    fontFamily: "medium",
    fontSize: 16,
    color: "#ff6f00",
    textAlign: 'center',
    marginLeft: 4,
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
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 13,
    marginTop: 10,
  },
  button: {
    width: 72,
    height: 33,
  },
});