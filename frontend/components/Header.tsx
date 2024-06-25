import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Header({ title, backButton }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {backButton
         ? <Ionicons name="arrow-back" size={23} color="black" onPress={() => router.back()}/>
         : <></>
        }
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.placeholder}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#9e9e9e",
    backgroundColor: '#FBEAEB',
    paddingTop: 10,
    paddingBottom: 3,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    width: "20%",
    justifyContent: "center",
  },
  titleContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "semiBold",
    fontSize: 26,
  },
  placeholder:{
    width: "20%",
  }
})