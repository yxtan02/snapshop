import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from 'expo-router';
import { auth, db } from '../../../firebaseConfig.js';
import { collection, getDocs } from "firebase/firestore"; 

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
    getDocs(collection(db, 'users', userId, 'history'))
    .then(res => {
      const data: any[] = []
      res.forEach((doc) => {
        data.push({userId: userId, docId: doc.id, ...doc.data()})
      })
      setHistory(data)
    })
  }, [isRefresh])

  const renderItem = ({ item }: any) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
      {Object.entries(item).map(([key, value]) => (
        <Text key={key}>{`${key}: ${value}`}</Text>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Text style={styles.header}>History</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.docId}
        renderItem={renderItem}
      />
      <View>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaContainer :{
    width: "100%",
    height: "100%",
    backgroundColor: '#FBEAEB',
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    fontFamily: "semiBold",
    fontSize: 26,
    margin: 16,
  }
})