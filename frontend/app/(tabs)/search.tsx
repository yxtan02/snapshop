import { launchCameraAsync, launchImageLibraryAsync } from 'expo-image-picker';
import { Redirect, router } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, StyleSheet, View, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchButton from '../../components/searchButton';
import { authy, db, storage } from '../../firebaseConfig.js';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import Header from '../../components/Header';

export default function search() {
  const [input, setInput] = useState("")
  let userId: string

  if (authy.currentUser) {
    userId = authy.currentUser.uid
  } else {
    alert("You are not signed in")
    return <Redirect href="/login"/>
  }

  function saveToHistory(item: any, imageFile: any) {
    addDoc(collection(db, 'users', userId, 'history'), {
      ...item,
      createdAt: serverTimestamp()
    })
      .then((res) => {
        console.log(`Item added (id: ${res.id})`);
        uploadBytes(ref(storage, `${userId}/${res.id}`), imageFile)
          .then((res) => {
            console.log('Image uploaded')
          })
          .catch((error) => {
            console.error('Error uploading image: ', error);
          })
      })
      .catch((error) => {
        console.error('Error adding item: ', error);
      });
    
  }

  async function performSearch() {
    let blob = await fetch("https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg").then(r => r.blob());
    saveToHistory({item: input}, blob)
    router.navigate({ pathname: 'snap/result', params: { item: input, type: "search" } })
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Header title="Search" backButton={false} />
        <View style={styles.infoContainer}>
          <Text style={styles.info}>Can't find your desired product with Snap? Use keyword search instead</Text>
        </View>
        <View style={styles.searchSection}>
            <TextInput
                value={input}
                onChangeText={setInput}
                autoCapitalize='none'
                style={styles.textInput}
            />
            <SearchButton onPress={performSearch}/>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer :{
    width: "100%",
    height: "100%",
    backgroundColor: '#FBEAEB',
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  infoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 25,
    paddingHorizontal: 12,
  },
  info: {
    fontFamily: 'regular',
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  searchSection: {
    width: "83%",
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: "100%",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#2d2d2d',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 16,
    marginTop: 5,
    fontSize: 16,
    fontFamily: "regular",
  }
});