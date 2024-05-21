import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function Page() {
  const { item } = useLocalSearchParams()
  const [amazon, setAmazon] = useState([])
  const [lazada, setLazada] = useState([])
  const [ebay, setEbay] = useState([])

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
  }, []);

  if (!(amazon || lazada || ebay)) {
    return <ActivityIndicator />
  }

  return (
    <View style={styles.container}>
      <Text>Product: {item}</Text>
      <Text>Amazon</Text>

      {amazon.map((obj, index) => 
        <View key={index}>
          <Text>{obj["asin"]}</Text>
        </View>)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 20,
  },
});