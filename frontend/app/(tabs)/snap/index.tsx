import { launchCameraAsync, launchImageLibraryAsync } from 'expo-image-picker';
import { Redirect, router } from 'expo-router';
import { useState } from 'react';
import { Text, Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/IconButton';
import { auth, db, storage } from '../../../firebaseConfig.js';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import Header from '../../../components/Header';


export default function snap() {
  const [image, setImage] = useState("")
  let userId: string

  if (auth.currentUser) {
    userId = auth.currentUser.uid
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

  async function getPhoto(func: any) {
    //uncomment the line below to avoid using the microsoft vision API
    //router.navigate({ pathname: 'snap/result', params: { item: "toothbrush" } })

    let query : string = ""

    let result = await func({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const imageUri = result.assets[0].uri;
      
      // Convert image uri to blob
      const blob : BlobPart = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        //console.warn(image)
        xhr.open("GET", imageUri, true);
        xhr.send(null);
      });

      const imageFile = new File([blob], "image.jpg", { type: "image/jpeg" })

      //Microsoft vision API (Superior)
      //Brand detection
      fetch('https://snapshop.cognitiveservices.azure.com/vision/v3.2/analyze?visualFeatures=Brands', { 
        method: 'post',
        headers: { "Ocp-Apim-Subscription-Key": "c19fa222b25b454e9a3e42eecfedae10",
                    "Content-Type": "application/octet-stream"
         },
        body: blob
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data["brands"] != undefined && data["brands"].length != 0) {
          query = data["brands"][0]["name"];
        }

        //Image captioning
        fetch('https://snapshop.cognitiveservices.azure.com/computervision/imageanalysis:analyze?api-version=2024-02-01&features=caption', {
          method: 'post',
          headers: { "Ocp-Apim-Subscription-Key": "c19fa222b25b454e9a3e42eecfedae10",
                      "Content-Type": "application/octet-stream"
           },
          body: blob
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          query = data["captionResult"]["text"] + " " + query;
          console.log(query)
          saveToHistory({item: query}, imageFile)
          router.navigate({ pathname: 'snap/result', params: { item: query } })
        })
        .catch(error => console.error(error));
      })
      .catch(error => console.error(error));
    }
  }

  async function takePhoto() {
    return getPhoto(launchCameraAsync);
  }

  async function uploadPhoto() {
    return getPhoto(launchImageLibraryAsync)
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Header title="Snap" backButton={false} />
        <View style={styles.infoContainer}>
          <Text style={styles.info}>Find your desired product simply by taking or uploading a photo</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button label="Take a photo" name="picture-o" onPress={takePhoto}/>
          <Button label="Upload a photo" name="camera" onPress={uploadPhoto}/>
          {/* <Button label="result" onPress={() => router.navigate('/snap/result?item=a+gold+watch+with+a+black+square+face')}/> */}
        </View>
        <Image
          resizeMode='contain'
          source={{ uri: image }}
          style={styles.image} />
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
  buttonContainer: {
    width: "83%",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: "90%",
    height: "50%",
    marginTop: 24,
    marginBottom: 50,
    borderRadius: 10,
  },
});
