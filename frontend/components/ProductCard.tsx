import { Image, Linking, StyleSheet, Text, View } from 'react-native'
import LikeButton from './LikeButton';
import SmallButton from './SmallButton';
import { AntDesign } from '@expo/vector-icons';

export default function ProductCard({ item, userId }: any) {
  return (
    <View style={styles.cardContainer}>
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
              <AntDesign name="star" size={15} color="#ff6f00" style={styles.star}/>
              <Text style={styles.rating}>
                {item.rating == "No ratings found"
                 ? item.rating
                 : item.rating + " stars"}
              </Text>
            </View>
            <View style={styles.descriptionContainer}>
              {item.sales !== "" && <Text style={styles.sales}>{item.sales}</Text>}
              {item.delivery !== "" && <Text style={styles.delivery}>{item.delivery}</Text>}
            </View>
            <View style={styles.buttonContainer}>
              <SmallButton
                title="Buy now!"
                onPress={() => Linking.openURL(item.url)
                               .catch((err) => console.error('Failed to open url', err))}
                containerStyle={{ width: 80, height: 34 }}
              />
              <LikeButton userId={userId} item={item} />
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
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    width: 275,
  },
  titleContainer: {
    width: "100%",
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "semiBold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 12,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 2,
    alignSelf: 'center',
  },
  detailsContainer: {
    marginTop: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    fontFamily: "semiBold",
    fontSize: 18,
    color: "#c2185b",
    textAlign: 'center',
    lineHeight: 24
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  star: {
    marginBottom: 2,
  },
  rating: {
    fontFamily: "medium",
    fontSize: 18,
    color: "#ff6f00",
    textAlign: 'center',
    marginLeft: 4,
    lineHeight: 24
  },
  descriptionContainer: {
    marginTop: 4,
    marginBottom: 10,
  },
  sales: {
    fontSize: 14,
    fontFamily: "regular",
    textAlign: 'center',
    lineHeight: 20
  },
  delivery: {
    fontSize: 14,
    fontFamily: "regular",
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 18,
  },
});