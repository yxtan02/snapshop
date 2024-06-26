import { FlatList, StyleSheet, Text, View } from 'react-native'
import ProductCardVertical from './ProductCardVertical'

export default function ProductList({ title, data, userId }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {data.length == 0 ? <Text style={styles.noResultText}>No results found</Text> :
      <FlatList
        data={data}
        renderItem={({ item }) => <ProductCardVertical item={item} userId={userId}/>}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        contentContainerStyle={{ gap: 8 }}
        style={styles.flatList}
      />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontFamily: "bold",
    marginLeft: 5,
    textAlign: 'center',
    marginTop: 20,
  },
  noResultText: {
    fontSize: 18,
    fontFamily: "regular",
    marginBottom: 12,
    marginLeft: 5,
  },
  flatList: {
    width: "100%"
  },
})