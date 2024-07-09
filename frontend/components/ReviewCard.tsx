import { Image, StyleSheet, Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

export default function ReviewCard ({ item }: any) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.ratingContainer}>
        <AntDesign name="star" size={15} color="#ff6f00" style={styles.star} />
        <Text style={styles.rating}>{item.rating} stars</Text>
      </View>
      <View style={styles.authorContainer}>
        <Image source={{uri: item.author_avatar}} style={styles.image}/>
        <Text style={styles.author}>{item.author}</Text>
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.comment}>{item.comment}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    backgroundColor: '#FBEAEB',
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 6
  },
  ratingContainer: {
    flexDirection: "row",
  },
  star: {
    marginTop: 3,
  },
  rating: {
    fontFamily: "medium",
    fontSize: 16,
    color: "#ff6f00",
    marginLeft: 4,
  },
  title: {
    fontFamily: "semiBold"
  },
  comment: {
    fontFamily: "regular"
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6
  },
  image: {
    width: 14,
    height: 14,
    borderRadius: 10,
    marginBottom: 2,
  },
  author: {
    fontFamily: "extraLight",
    fontSize: 12,
    marginLeft: 4
  },
  date: {
    fontFamily: "extraLight",
    fontSize: 11,
    marginTop: 4,
  }
})