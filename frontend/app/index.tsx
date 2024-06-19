import { router } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import { icons, images } from '../constants'


export default function App() {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ImageBackground
        source={images.background}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Image
              source={icons.logo}
              resizeMode='contain'
              style={styles.logo}
            />
            <Text style={styles.logoText}>SnapShop</Text>
          </View>
          <Image
            source={images.homeImage}
            resizeMode="cover"
            style={styles.homeImage}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Log In"
              onPress={() => router.navigate('/login')}
              containerStyle={styles.loginButton}
              textStyle={styles.buttonText}
            />
            <Button
              title="Sign Up"
              onPress={() => router.navigate('/sign-up')}
              containerStyle={styles.signUpButton}
              textStyle={{...styles.buttonText, color: 'black'}}
            />
          </View>
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 56,
    height: 56,
    marginRight: 3,
    marginBottom: 7,
  },
  logoText: {
    fontFamily: "brusher",
    fontSize: 76,
  },
  homeImage: {
    width: 260,
    height: 260,
    marginLeft: 40,
    marginTop: 18,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 40,
  },
  loginButton: {
    width: "75%",
    backgroundColor: "#2F3C7E",
    height: 50,
  },
  signUpButton: {
    marginTop: 11,
    width: "75%",
    backgroundColor: "#EDF4F2",
    height: 50,
  },
  buttonText: {
    fontSize: 17,
    fontFamily: 'semiBold'
  },
});