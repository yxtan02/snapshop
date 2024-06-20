import { launchCameraAsync, launchImageLibraryAsync } from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Text, Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../../components/IconButton';


export default function snap() {
  const [image2, setImage] = useState("")
  let image : string = "";

  async function getPhoto(func: any) {
    //uncomment the line below to avoid using the microsoft vision API
    //router.navigate({ pathname: 'result', params: { item: "toothbrush" } })

    let result = await func({
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      image = result.assets[0].uri;
      
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
        xhr.open("GET", image, true);
        xhr.send(null);
      });

      //Microsoft vision API (Superior)
      fetch('https://snapshop.cognitiveservices.azure.com/computervision/imageanalysis:analyze?api-version=2024-02-01&features=caption', { //'http://127.0.0.1:8000/detectImage'
        method: 'post',
        headers: { "Ocp-Apim-Subscription-Key": "c19fa222b25b454e9a3e42eecfedae10",
                    "Content-Type": "application/octet-stream"
         },
        body: blob
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        // router.navigate({ pathname: 'snap/result', params: { item: data["captionResult"]["text"] } })
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
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Snap</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>Find your desired product simply by taking or uploading a photo</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button label="Take a photo" name="picture-o" onPress={takePhoto}/>
          <Button label="Upload a photo" name="camera" onPress={uploadPhoto}/>
        </View>
        <Image source={{ uri: image2 }} style={styles.image} />
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
  headerContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#83829A",
    // backgroundColor: '#FCEBF5'
  },
  header: {
    fontFamily: "semiBold",
    fontSize: 26,
    marginTop: 15,
    marginBottom: 2
  },
  infoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 25,
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
    borderRadius: 15,
  },
});