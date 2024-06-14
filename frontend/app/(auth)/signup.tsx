import { router } from 'expo-router';
import { useState } from 'react'
import { Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { auth } from "../../firebaseConfig"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { images } from '../../constants';

export default function signUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function signUp() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user)
        router.navigate('/snap')
      })
      .catch((error) => {
        console.error(error)
        alert("Sign up failed!\n" + error.message)
      });
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={images.logo}
            resizeMode="contain"
            style= {{
              width: 115,
              height: 34
            }}
          />
          <Text style={styles.header}>
            Sign up for Snapshop!
          </Text>
          <KeyboardAvoidingView behavior='padding'>
            <TextInput
              placeholder='Email'
              value={email}
              onChangeText={setEmail}
              autoCapitalize='none'
            />
            <TextInput
              placeholder='Password'
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize='none'
            />
            <TouchableOpacity onPress={signUp}>
              <Text>Register</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    height: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems:'center',
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  header: {
    fontFamily: "bold",
  }
})