import { router } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, Text, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../components/Button';
import { icons, images } from '../constants'


export default function App() {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ImageBackground
        source={images.background}
        resizeMode='contain'
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
    height: "100%",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 45,
    height: 45,
  },
  logoText: {
    fontFamily: "brusher",
    fontSize: 75,
  },
  homeImage: {
    width: 225,
    height: 216,
    marginLeft: 34,
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 32,
  },
  loginButton: {
    width: 270,
    backgroundColor: "#2F3C7E"
  },
  signUpButton: {
    marginTop: 9,
    width: 270,
    backgroundColor: "#EDF4F2"
  },
  buttonText: {
    fontSize: 17,
    fontFamily: 'semiBold'
  },
});