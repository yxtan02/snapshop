import { useEffect, useState } from 'react';
import { Image, ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from '../firebaseConfig.js'
import LikeButton from '../components/LikeButton';

export default function result() {
  const { item } = useLocalSearchParams()
  const [amazon, setAmazon] = useState([])
  const [lazada, setLazada] = useState([])
  const [ebay, setEbay] = useState([])
  const [userId, setUserId] = useState<string | undefined>("")

  useEffect(() => {
    // fetch(`http://127.0.0.1:8000/search/${item}`)

    fetch('http://127.0.0.1:8000/search')
      .then(res => {
        if (!res.ok) {
          console.log("Server Error")
        }
        return res.json()
      })
      .then(data => {
        console.log(data)
        setAmazon(data.amazon)
        setLazada(data.lazada)
        setEbay(data.ebay)
      })
      .catch(error => console.error(error));
      
    setUserId(auth.currentUser?.uid)
  }, []);

  if (!(amazon || lazada || ebay)) {
    return <ActivityIndicator />
  }

  //sort by price in ascending order
  amazon.sort((a : any, b : any) => parseFloat(a["product_price"].slice(2)) - parseFloat(b["product_price"].slice(2)));
  lazada.sort((a : any, b : any) => parseFloat(a.price) - parseFloat(b.price));
  ebay.sort((a : any, b : any) => parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1)));

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#F71199', '#FCEBF5']}
        style={styles.headerContainer}
        locations={[0.5, 0.8]}
      >
        <Text style={styles.description}>{item}</Text>
      </LinearGradient>

      <Text style={styles.header}>Amazon</Text>
      
      {amazon.map((obj, index) => 
        <View key={index} style={{marginLeft: 5}}>
          <Text style={styles.words}>{obj["product_title"]}</Text>
          <Image style={styles.image} source={{uri: obj["product_photo"]}}/>
          <Text style={styles.price}>{obj["product_price"]}</Text>
          <Text style={styles.price}>{obj["product_star_rating"] + " stars"}</Text>
          <Text style={styles.desc}>{obj["sales_volume"]}</Text>
          <Text style={styles.desc}>{obj["delivery"]}</Text>
          <LikeButton 
            userId={userId}
            item={{
              title: obj["product_title"],
              image: obj["product_photo"],
              price: obj["product_price"],
              rating: obj["product_star_rating"] + " stars",
              url: obj["product_url"],
              others: obj["sales_volume"] + " | " + obj["delivery"]
            }}
          />
        </View>)}

        <Text style={styles.header}>Lazada</Text>

        
        {lazada.map((obj, index) => 
        <View key={index} style={{marginLeft: 5}}>
          <Text style={styles.words}>{obj["title"]}</Text>
          <Image style={styles.image} source={{uri: obj["img"]}}/>
          <Text style={styles.price}>{"S$" + obj["price"]}</Text>
          <Text style={styles.price}>{parseFloat(obj["review_info"]["average_score"]).toFixed(2) + " stars"}</Text>
          <Text style={styles.desc}>{obj["sold_count"] + " sold"}</Text>
          <LikeButton 
            userId={userId}
            item={{
              title: obj["title"],
              image: obj["img"],
              price: "S$" + obj["price"],
              rating: parseFloat(obj["review_info"]["average_score"]).toFixed(2) + " stars",
              url: obj["product_url"],
              others: obj["sold_count"] + " sold"
            }}
          />
        </View>)}
        
        <Text style={styles.header}>eBay</Text>

        {ebay.map((obj, index) => 
        <View key={index} style={{marginLeft: 5}}>
          <Text style={styles.words}>{obj["title"]}</Text>
          <Image style={styles.image} source={{uri: obj["image"]}}/>
          <Text style={styles.price}>{"S" + obj["price"]}</Text>
          <Text style={styles.price}>{obj["rating"] === "" ? "" : obj["rating"] + " stars"}</Text>
          <Text style={styles.desc}>{obj["shipping"]}</Text>
          <LikeButton 
            userId={userId}
            item={{
              title: obj["title"],
              image: obj["image"],
              price: "S" + obj["price"],
              rating: obj["rating"] === "" ? "No ratings found" : obj["rating"] + " stars",
              url: obj["url"],
              others: obj["shipping"]
            }}
          />
        </View>)}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCEBF5',
    borderColor: '#FCEBF5',
    marginBottom: -5
  },
  headerContainer: {
    flex: 2 / 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#835A72",
    width: '100%',
    marginTop: '-25%'
  },
  description: {
    fontSize: 40,
    color: "white",
    fontStyle: 'italic'
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 5
  },
  header: {
    fontSize: 30,
    color: "black",
    fontWeight: "bold",
    marginLeft: 5,
    marginTop: 5
  },
  words: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "brown",
    marginBottom: 5,
    marginTop: 20
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#E50B8C"
  },
  desc: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "black",
    marginBottom: 5
  }
});
