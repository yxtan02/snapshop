import { Image, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { db } from '../firebaseConfig.js';
import { doc, deleteDoc } from "firebase/firestore";
import SmallButton from "./SmallButton";

export default function HistoryCard({ item, isRefresh, setIsRefresh }: any) {
  function deleteFromHistory(userId: string, docId: string) {
    deleteDoc(doc(db, "users", userId, "history", docId))
      .then(() => {
        setIsRefresh(!isRefresh)
      })
      .catch((error) => {
        console.error('Error deleting item: ', error);
      })
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.parentContainer}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.item}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
                source={{uri: "data:image/jpeg;base64," + item.image}}
                resizeMode='contain'
                style={styles.image}
            />
          </View>
        </View>
        <View style={styles.buttonParentContainer}>
          <View style={styles.buttonContainer}>
            <SmallButton
              title="View"
              onPress={() => router.navigate({ pathname: 'snap/result', params: { item: item.item } })}
            />
            <SmallButton
              title="Delete"
              onPress={() => deleteFromHistory(item.userId, item.docId)}
              containerStyle={{ backgroundColor: "#e53935" }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    cardContainer: {
      width: "100%",
      backgroundColor: '#FBEAEB',
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      marginTop: 5,
      justifyContent: "center",
    },
    parentContainer: {
      flex: 1,
      flexDirection: "row",
    },
    container: {
      width: "75%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    titleContainer: {
      paddingHorizontal: 5,
    },
    title: {
      fontFamily: "medium",
      textAlign: 'center',
      marginVertical: 5,
    },
    imageContainer: {
      width: "100%",
    },
    image: {
      width: "100%",
      height: 100,
    },
    buttonParentContainer: {
      width: "24%",
      justifyContent: "flex-end",
    },
    buttonContainer: {
      height: 100,
      justifyContent: "center",
      alignItems: "flex-end",
      gap: 12,
    },
  })