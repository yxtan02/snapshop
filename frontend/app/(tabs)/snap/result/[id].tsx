import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Header from '../../../../components/Header';
import { db } from '../../../../firebaseConfig.js';
import { collection, getDocs, query, where } from "firebase/firestore"; 

export default function product() {
  const { id } = useLocalSearchParams()

  useEffect(() => {
    const q = query(collection(db, 'products'), where("id", "==", id));
    getDocs(q)
      .then(res => {})
  }, [])
  
  return (
    <SafeAreaView>
      <Header title="Product" backButton={true}/>
      <View>
        <Text>{id}</Text>
      </View>
    </SafeAreaView>
  )
}