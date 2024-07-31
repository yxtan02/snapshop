import { Link, router } from 'expo-router';
import { useState } from 'react';
import { TouchableOpacity, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { authy } from "../../firebaseConfig";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithEmailAndPassword, signInWithCredential } from "firebase/auth";
import { icons } from '../../constants';
import Button from '../../components/Button';

  
export default function login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setSubmitting] = useState(false);


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