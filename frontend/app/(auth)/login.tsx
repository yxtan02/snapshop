import { Link, router } from 'expo-router';
import { useState } from 'react';
import { TouchableOpacity, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authy } from "../../firebaseConfig";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithEmailAndPassword, signInWithCredential } from "firebase/auth";
import { icons } from '../../constants';
import Button from '../../components/Button';
import {GoogleSignin, statusCodes, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import OR from '../../components/OR';
//import {LoginManager, AccessToken, LoginButton} from 'react-native-fbsdk-next'
  
export default function login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setSubmitting] = useState(false);

  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID, // From Google Developer Console
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    scopes: ['profile', 'email'],
  });
  
  async function onGoogleButtonPress() {
    try {
      console.log("Google Sign-In button pressed");
  
      // Check if your device supports Google Play services.
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  
      // Get the user's ID token
      const { idToken } = await GoogleSignin.signIn();
  
      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken);
  
      // Sign-in the user with the credential
      await signInWithCredential(authy, googleCredential)
        .then((res) => {
          router.replace('/snap')
        })
  
      console.log("User signed in successfully!");
      // Redirect or do other necessary actions
    } catch (error : any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log("User cancelled the login flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log("Sign in operation is in progress already");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log("Play services not available or outdated");
      } else {
        // some other error happened
        console.log("An error occurred during sign in:" + error);
      }
    }
  }

  // const onFacebookButtonPress = async () => {
  //   try {
  //     const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  //     if (result.isCancelled) {
  //       alert('User cancelled login')
  //     }

  //     const data = await AccessToken.getCurrentAccessToken();
  //     if (!data) {
  //       alert('Something went wrong obtaining access token');
  //       throw new Error("Something went wrong obtaining access token")
  //     }

  //     const credential = FacebookAuthProvider.credential(data.accessToken);
  //     await signInWithCredential(authy, credential)
  //       .then((res) => {
  //         router.replace('/snap')
  //       })
  //   } catch (error : any) {
  //     alert(error)
  //   }
  // }

  function login() {
    setSubmitting(true)
    signInWithEmailAndPassword(authy, email, password)
      .then((res) => {
        console.log(res.user)
        router.replace('/snap')
      })
      .catch((error) => {
        console.error(error)
        alert("Login failed!\n" + error.message)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Image
              source={icons.logo}
              resizeMode='contain'
              style={styles.logo}
            />
            <Text style={styles.logoText}>SnapShop</Text>
          </View>
          <Text style={styles.header}>
               Login to Snapshop!   
          </Text>
          <View style={styles.mainContainer}>
            <Text style={styles.title}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              autoCapitalize='none'
              style={styles.textInput}
            />
            <Text style={styles.title}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize='none'
              style={styles.textInput}
            />
            <Button
              title="Login"
              onPress={login}
              isLoading={isSubmitting}
              containerStyle={styles.button}
            />
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>
                Don't have an account?
              </Text>
              <Link
                href="/sign-up"
                style={styles.linkText}
              >
                Sign up
              </Link>
            </View>
          </View>
          <OR></OR>
          <GoogleSigninButton 
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark} 
            onPress={
            onGoogleButtonPress}>
          </GoogleSigninButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaContainer :{
    width: "100%",
    height: "100%",
    backgroundColor: '#FBEAEB',
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    marginVertical: 42,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 41,
    height: 41,
    marginRight: 3,
    marginBottom: 3,
  },
  logoText: {
    fontFamily: "brusher",
    fontSize: 44,
  },
  header: {
    fontFamily: "bold",
    fontSize: 26,
    marginTop: 32,
    marginBottom: 2,
  },
  mainContainer: {
    width: "100%",
    marginTop: 2,
  },
  title: {
    fontSize: 18,
    fontFamily: "medium",
    marginTop: 18,
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
  },
  button: {
    marginTop: 32,
    width: "100%",
  },
  footerContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    flexDirection: "row",
    gap: 8,
    marginBottom: 5
  },
  footerText: {
    fontSize: 18,
    fontFamily: 'light',
  },
  linkText: {
    fontSize: 18,
    fontFamily: 'medium',
  },
});