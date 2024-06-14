import { router } from 'expo-router';
import { useState } from 'react'
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth } from "../../firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth"
import { images } from '../../constants';
import Button from '../../components/Button';

export default function login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setSubmitting] = useState(false);

  async function login() {
    setSubmitting(true)
    signInWithEmailAndPassword(auth, email, password)
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
          <Image
            source={images.logo}
            resizeMode="contain"
            style= {styles.image}
          />
          <Text style={styles.header}>
            Login to Snapshop!
          </Text>
          <KeyboardAvoidingView behavior='padding' style={styles.keyboardAvoidingView}>
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
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaContainer :{
    height: "100%",
  },
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  image: {
    width: 115,
    height: 34,
  },
  keyboardAvoidingView: {
    width: "100%",
  },
  header: {
    fontFamily: "semiBold",
    fontSize: 24,
    fontWeight: "600",
    marginTop: 40,
  },
  title: {
    fontSize: 16,
    fontFamily: "medium",
    marginTop: 8,
  },
  textInput: {
    width: "100%",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#2d2d2d',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 5,
    fontSize: 16,
    fontFamily: "regular",
  },
  button: {
    marginTop: 10,
  }
});