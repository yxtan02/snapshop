import { Image, StyleSheet, Text, View } from 'react-native';
import LikeButton from './LikeButton';
import { AntDesign } from '@expo/vector-icons';

export default function PriceCompCard({ item, userId }: any) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.title}</Text>
        </View>
        <Image
            source={{uri: item.image}}
            resizeMode='contain'
            style={styles.image}
        />
        <View style={styles.detailsContainer}>
            <Text style={styles.price}>S${item.price}</Text>
            <View style={styles.ratingContainer}>
              <AntDesign name="star" size={15} color="#ff6f00"/>
              <Text style={styles.rating}>{item.rating} stars</Text>
            </View>
            <Text style={styles.desc}>From: {item.platform}</Text>
            <Text style={styles.desc}>{item.sales}</Text>
            <Text style={styles.desc}>{item.delivery}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <LikeButton 
            userId={userId}
            item={item}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#FBEAEB',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  container: {
    flexDirection: "column",
  },
  titleContainer: {
  
  },
  title: {
    fontFamily: "semiBold",
    fontSize: 20,
    // color: "brown",
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 20,
  },
  image: {
    width: 256,
    height: 256,
    borderRadius: 2,
    marginBottom: 5,
    alignSelf: 'center',
  },
  detailsContainer: {
    gap: 0,
  },
  price: {
    fontFamily: "semiBold",
    fontSize: 20,
    color: "#c2185b",
    textAlign: 'center'
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rating: {
    fontFamily: "medium",
    fontSize: 20,
    color: "#ff6f00",
    textAlign: 'center',
    marginLeft: 4
  },
  desc: {
    fontSize: 16,
    fontFamily: "regular",
    textAlign: 'center'
  },
  buttonContainer: {
  },
});