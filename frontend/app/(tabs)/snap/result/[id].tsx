import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Header from '../../../../components/Header';
import { db } from '../../../../firebaseConfig.js';
import { doc, getDoc } from "firebase/firestore";
import ProductCardHorizontal from '../../../../components/ProductCardHorizontal';
import ReviewCard from '../../../../components/ReviewCard';

export default function product() {
  const { id } = useLocalSearchParams()
  const [item, setItem] = useState<any>(null)
  const [reviews, setReviews] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    async function fetchData() {
      if (typeof id === 'string') {
        try {
          setIsLoading(true)
          const docSnap = await getDoc(doc(db, 'products', id))
          if (docSnap.exists()) {
            const item = docSnap.data()
            setItem(item)
            await fetchReviews(item)
          } else {
            console.error("Product not found")
          }
        } catch(error) {
          console.error("Failed to fetch product: " + error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    async function fetchReviews(item: any) {
      if (item.platform == "amazon") {
        // for testing
        let reviewData: any[] = reviewTestData.map(review => ({
          id: review["review_id"],
          title: review["review_title"],
          comment: review["review_comment"],
          rating: review["review_star_rating"],
          author: review["review_author"],
          author_avatar: review["review_author_avatar"],
          date: review["review_date"]
        }))
        setReviews(reviewData)

        // uncomment to use the actual API
        // return fetch(`https://real-time-amazon-data.p.rapidapi.com/product-reviews?asin=${id}&country=SG`, {
        //   method: 'GET',
        //   headers: {
        //     'X-RapidAPI-Key': 'e54e6469c9mshfd93a2d40f44b01p14bbe0jsn509f9fa4490e',
        //     'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
        //   },
        // })
        //   .then(res => {
        //     if (!res.ok) {
        //       console.error("Error fetching review data")
        //     }
        //     console.log("Fetch review success")
        //     return res.json()
        //   })
        //   .then(data => {
        //     console.log(data)
        //     let reviewData: any[] = data["data"]["reviews"]
        //     reviewData = reviewData.map(review => ({
        //       id: review["review_id"],
        //       title: review["review_title"],
        //       comment: review["review_comment"],
        //       rating: review["review_star_rating"],
        //       author: review["review_author"],
        //       author_avatar: review["review_author_avatar"],
        //       date: review["review_date"]
        //     }))
        //     setReviews(reviewData)
        //   })
        //   .catch(error => console.error("Failed to fetch reviews" + error))
      }
    }

    fetchData()
  }, [])
  
  if (isLoading) {
    return (
      <SafeAreaView style={{ width: "100%", height: "100%" }}>
        <Header title="Product" backButton={true}/>
        <View style={styles.activityIndicator}>
          <ActivityIndicator size='large'/>
        </View>
      </SafeAreaView>
    )
  }

  if (item == null) {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <Header title="Product" backButton={true}/>
        <Text style={styles.noProductText}>No such product found!</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Header title="Product" backButton={true}/>
      <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ReviewCard item={item}/>}
          style={styles.flatlist}
          ListEmptyComponent={() => <Text style={styles.noReviewFoundText}>No reviews found</Text>}
          ListHeaderComponent={() =>
            <>
              <ProductCardHorizontal item={item} containerStyle={{borderWidth: 0}}/>
              <Text style={styles.reviewsHeader}>Reviews</Text>
            </>
          }
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaContainer :{
    width: "100%",
    height: "100%",
    backgroundColor: '#FBEAEB',
    alignItems: "center",
  },
  activityIndicator: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  noProductText: {
    fontFamily:"regular",
    fontSize: 16,
    marginTop: 8,
  },
  flatlist: {
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 12
  },
  noReviewFoundText: {
    fontFamily: "regular",
    marginLeft: 8
  },
  reviewsHeader: {
    fontFamily: "bold",
    fontSize: 18,
    marginLeft: 8,
    marginTop: 20,
    marginBottom: 4
  }
})

const reviewTestData = [
  {
    "review_id":"RO31NIB9345R6",
    "review_title":"No other toothbrush come close",
    "review_comment":"Trusted brand and this design just does it for me. My teeth feels like it has been to the dentist for a cleaning job every morning when I brush with this. Buying this here took less than 5 hours for same day delivery! And the ones I got are manufactured 8 months ago!",
    "review_star_rating":"5",
    "review_link":"https://www.amazon.sg/gp/customer-reviews/RO31NIB9345R6",
    "review_author":"Bogeyman72",
    "review_author_avatar":"https://images-fe.ssl-images-amazon.com/images/S/amazon-avatars-global/316a167f-509b-4552-ba7c-aa4535e11629._CR0,0.0,333,333_SX48_.jpg",
    "review_images": [
      "https://m.media-amazon.com/images/I/71DgqAscOFL._SY88.jpg",
      "https://m.media-amazon.com/images/I/81-ec83IjIL._SY88.jpg"
    ],
    "review_video": {
      "stream_url":"https://m.media-amazon.com/images/S/vse-vms-transcoding-artifact-us-west-2-prod/ba8c1cf7-f3c5-4dcd-b793-03795fcca7fa/default.jobtemplate.hls.m3u8",
      "closed_captions_url": null,
      "thumbnail_url":"https://m.media-amazon.com/images/I/61vJF4W8HDL._SY256._SY256.jpg",
    },
    "review_date":"Reviewed in Singapore on 29 December 2022",
    "is_verified_purchase": true,
    "reviewed_product_asin":"B071Y7P57G"
  },
  {
    "review_id":"R1BBQM70YJJWNP",
    "review_title":"price right",
    "review_comment":"reasonable price :)",
    "review_star_rating":"5",
    "review_link":"https://www.amazon.sg/gp/customer-reviews/R1BBQM70YJJWNP",
    "review_author":"Joycelyn",
    "review_author_avatar":"https://images-fe.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png",
    "review_images": [],
    "review_video": null,
    "review_date":"Reviewed in Singapore on 27 October 2022",
    "is_verified_purchase": true,
    "reviewed_product_asin":"B071Y7P57G",
  },
  {
    "review_id":"R2UFWAKK5C7QWY",
    "review_title":"Came in perfect condition",
    "review_comment":"Package arrive in perfect condition. I am excited to try Colgate toothbrush!",
    "review_star_rating":"5",
    "review_link":"https://www.amazon.sg/gp/customer-reviews/R2UFWAKK5C7QWY",
    "review_author":"Sarah Mah Enhui",
    "review_author_avatar":"https://images-fe.ssl-images-amazon.com/images/S/amazon-avatars-global/05feb3a6-7ba2-4eca-ada1-ee604f95a1f6._CR0,0,375,375_SX48_.jpg",
    "review_images": [],
    "review_video": null,
    "review_date": "Reviewed in Singapore on 8 September 2022",
    "is_verified_purchase": true,
    "reviewed_product_asin":"B0876DMR24",
  }
]