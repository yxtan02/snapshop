import { launchCameraAsync, launchImageLibraryAsync } from 'expo-image-picker';
import { StatusBar } from "expo-status-bar";
import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Button from '../components/Button';

export default function App() {
  const [image, setImage] = useState("")

  async function getPhoto(func: any) {
    let result = await func({
      allowsEditing: true,
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      // Convert image uri to file
      const blob : BlobPart = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });
      const file = new File([blob], "image.jpg", { type: "image/jpeg" })
      
      // Post image to backend API
      const formData = new FormData();
      formData.append("file", file)
      fetch('http://127.0.0.1:8000/search', {
        method: 'post',
        body: formData
      })
      .then(res => res.json())
      .then(data => {
         console.log(data)
      })
      .catch(error => {
         console.error(error);
      });
    }
  }

  async function takePhoto() {
    return getPhoto(launchCameraAsync)
  }

  async function uploadPhoto() {
    return getPhoto(launchImageLibraryAsync)
  }

  return (
    <View style={styles.container}>
      <View style={styles.footerContainer}>
        <Button label="Take a photo" name="picture-o" onPress={takePhoto}/>
        <Button label="Upload a photo" name="camera" onPress={uploadPhoto}/>
      </View>
      <Image source={{ uri: image }} style={styles.image} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 50,
  },
});
