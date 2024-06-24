import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from 'expo-router';
import { auth, db } from '../../firebaseConfig.js';
import { collection, getDocs } from "firebase/firestore"; 
import ProductCard from "../../components/ProductCard";

export default function wishlist() {
  const [wishlist, setWishlist] = useState<any[]>([])
  const [isRefresh, setIsRefresh] = useState(false)
  let userId: string

  if (auth.currentUser) {
    userId = auth.currentUser.uid
  } else {
    alert("You are not signed in")
    return <Redirect href="/login"/>
  }

  useEffect(() => {
    getDocs(collection(db, 'users', userId, 'wishlist'))
    .then(res => {
      const data: any[] = []
      res.forEach((doc) => {
        data.push({userId: userId, docId: doc.id, ...doc.data()})
      })
      setWishlist(data)
    })
  }, [isRefresh])
  
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Wishlist</Text>
        </View>
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.docId}
          renderItem={({ item }) => <ProductCard item={item} isRefresh={isRefresh} setIsRefresh={setIsRefresh}/>}
          style={styles.flatlist}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaContainer :{
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: '#F7CED7FF',
  },
  headerContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FBEAEB',
    // borderBottomWidth: 1,
    // borderBottomColor: "#83829A",
  },
  header: {
    fontFamily: "semiBold",
    fontSize: 26,
    marginTop: 15,
    marginBottom: 2
  },
  flatlist: {
    width: "95%"
  },
})