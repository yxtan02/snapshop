import { launchCameraAsync, launchImageLibraryAsync } from 'expo-image-picker';
import { router } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { useState } from 'react';
import { Text, Image, StyleSheet, View } from 'react-native';
import Button from '../../../components/IconButton';
import { LinearGradient } from 'expo-linear-gradient';


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
        router.navigate({ pathname: 'snap/result', params: { item: data["captionResult"]["text"] } })
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
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#F71199', '#FCEBF5']}
        style={styles.headerContainer}
        locations={[0.5, 0.8]}
      >
        <Text style={styles.description}>Snap or upload a photo</Text>
      </LinearGradient>
      <Image source={{ uri: image2 }} style={styles.image} />
      <View style={styles.footerContainer}>
        <Button label="Take a photo" name="picture-o" onPress={takePhoto}/>
        <Button label="Upload a photo" name="camera" onPress={uploadPhoto}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#FCEBF5'
  },
  headerContainer: {
    flex: 2 / 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#835A72",
    width: '100%',
    marginTop: '-25%'
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  image: {
    width: 400,
    height: 300,
    marginBottom: 50,
  },
  description: {
    fontSize: 40,
    color: "white",
    fontStyle: 'italic'
  }
});