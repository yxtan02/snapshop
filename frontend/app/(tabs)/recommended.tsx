import { useEffect, useState, createRef } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from 'expo-router';
import { authy, db } from '../../firebaseConfig.js';
import { collection, getDocs } from "firebase/firestore"; 
import { useIsFocused } from "@react-navigation/native";
import Header from '../../components/Header'
import ProductCardHorizontal from "../../components/ProductCardHorizontal";
import LoadMoreButton from '../../components/loadMoreButton';
import ToTopButton from '../../components/toTopButton';
import { images } from "../../constants"
import axios from 'axios';

let numRec : number = 15
let loadMore = true

const scrollRef : any = createRef();
const onPressTouch = () => {
  scrollRef.current?.scrollTo({
    y: 0,
    animated: true,
  });
}

export default function recommended() {
  const isFocused = useIsFocused()
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [allProducts, setAllProducts] = useState<any[]>([])
  const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
  const CONTENT_OFFSET_THRESHOLD = 300;
  let userId: string
  
  if (authy.currentUser) {
    userId = authy.currentUser.uid
  } else {
    alert("You are not signed in")
    return <Redirect href="/login"/>
  }

  useEffect(() => {
    setIsLoading(true)
    getDocs(collection(db, 'users', userId, 'wishlist'))
    .then(res => {
      const categoryList: any = {};
      res.forEach((doc) => {
        const categories = doc.data()["category"]
        if (categories != undefined && categories.length != 0) {
          for (let i = 0; i < categories.length; i++) {
            const categoryId = categories[i]["id"]
            if (categoryList[categoryId]) {
              categoryList[categoryId] += 1;
            } else {
              categoryList[categoryId] = 1;
            }
          }
        }
      })

      let highestCategory: string = "";
      let highestValue: number = -Infinity;

      for (const [category, value] of Object.entries(categoryList) as [string, number][]) {
        if (value > highestValue) {
          highestValue = value;
          highestCategory = category;
        }
      }
      console.log(highestCategory)

      axios.get(`https://real-time-amazon-data.p.rapidapi.com/products-by-category?category_id=${highestCategory}&page=1&country=SG`, {
        headers: {
          'X-RapidAPI-Key': process.env.EXPO_PUBLIC_RAPIDAPI_KEY || '',
          'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
        },
      })
        .then(res => {
          if (res.status !== 200) {
            console.error("Error fetching data");
          } else {
            console.log("Fetch success");
            return res.data;
          }
        })
        .then(data => {
          console.log(data)
          const amazonData: any[] = data["data"]["products"]
          let editedAmazon = amazonData.map(item => ({
            id: item["asin"],
            title: item["product_title"],
            image: item["product_photo"],
            price: item["product_price"] == null
                  ? "Invalid price"
                  : item["product_price"].slice(2),
            rating: item["product_star_rating"] == null
                    ? "No ratings found"
                    : parseFloat(item["product_star_rating"]).toFixed(2),
            sales: item["sales_volume"] == null
                  ? ""
                  : item["sales_volume"],
            delivery: item["delivery"] == null
                      ? ""
                      : item["delivery"],
            url: item["product_url"],
            platform: "amazon"
          }))
          editedAmazon = editedAmazon.filter(item => item.price != "Invalid price")
          setAllProducts(editedAmazon)
          setProducts(editedAmazon.slice(0, 15))
        })
        .catch(error => console.error(error))
        .finally(() => setIsLoading(false))
    })
    .catch(error => console.error(error))
  }, [isFocused])

  if (isLoading) {
    return (
      <SafeAreaView style={{ width: "100%", height: "100%" }}>
        <Header title="For You" backButton={false}/>
        <View style={styles.activityIndicator}>
          <ActivityIndicator size='large'/>
        </View>
      </SafeAreaView>
    )
  }

  if (products.length == 0) {
    return (
      <SafeAreaView style={{ width: "100%", height: "100%" }}>
        <Header title="For You" backButton={false}/>
        <View style={styles.textContainer}>
          <Image
            source={images.noProduct}
            resizeMode="contain"
            style={{
              width: 168,
              height: 100
            }}
          />
          <Text style={styles.text}>To receive recommendations, add at least 1 item to your wishlist</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Header title="For You" backButton={false} />
      <ScrollView style={styles.scrollView} ref={scrollRef} onScroll={event => setContentVerticalOffset(event.nativeEvent.contentOffset.y)} 
        scrollEventThrottle={16}>
        <Text style={styles.title}>Here are recommendations made just for you</Text>
        <View style={styles.container}>
          {products.map((item, index) => (
              <ProductCardHorizontal key={index} item={item} userId={userId}/>
          ))}
        </View>
        {loadMore ? <LoadMoreButton title="Load More" onPress={() => {
        numRec += 15
        setProducts(allProducts.slice(0, numRec))
        if (numRec >= allProducts.length) {
          loadMore = false
        }
      }}></LoadMoreButton> : <View></View>}
      </ScrollView>
      {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD &&
      <ToTopButton title="To the top" onPress={onPressTouch}></ToTopButton>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaContainer :{
    width: "100%",
    height: "100%",
    backgroundColor: '#FBEAEB',
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F7CED7FF"
  },
  textContainer: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontFamily: "regular",
    fontStyle: "italic",
    textAlign: "center",
    padding: 8
  },
  title: {
    fontFamily: 'medium',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8
  },
  activityIndicator: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "2.5%",
    marginTop: 12,
    marginBottom: 12,
    gap: 6,
  },
});