import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from 'expo-router';
import { auth, db } from '../../../firebaseConfig.js';
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import HistoryCard from "../../../components/HistoryCard";

export default function history() {
  const [history, setHistory] = useState<any[]>([])
  const [isRefresh, setIsRefresh] = useState(false)
  let userId: string

  if (auth.currentUser) {
    userId = auth.currentUser.uid
  } else {
    alert("You are not signed in")
    return <Redirect href="/login"/>
  }

  useEffect(() => {
    const q = query(collection(db, 'users', userId, 'history'), orderBy("createdAt", "desc"))
    getDocs(q)
    .then(res => {
      const data: any[] = []
      res.forEach((doc) => {
        data.push({userId: userId, docId: doc.id, ...doc.data()})
      })
      setHistory(data)
    })
  }, [isRefresh])

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <FlatList
          data={history}
          keyExtractor={(item) => item.docId}
          renderItem={({ item }) => <HistoryCard item={item} isRefresh={isRefresh} setIsRefresh={setIsRefresh}/>}
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
    backgroundColor: "#F7CED7FF",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  flatlist: {
    width: "95%"
  }
})