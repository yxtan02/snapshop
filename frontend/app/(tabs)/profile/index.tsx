import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect, router } from 'expo-router'
import { authy } from '../../../firebaseConfig.js'
import { icons } from "../../../constants"
import MenuTab from '../../../components/MenuTab'
import Header from '../../../components/Header'
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default function profile() {
  if (!authy.currentUser) {
    alert("You are not signed in")
    return <Redirect href="/login"/>
  }

  const signOut = async () => {
    try {
      // Sign out from Google
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      // Sign out from Firebase
      await authy.signOut();

      // Navigate to the login screen
      router.replace('/login');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Header title="Profile" backButton={false} />
        <View style={styles.userContainer}>
          <Image
            source={icons.profile}
            style={styles.image}
          />
          <Text style={styles.userName}>{authy.currentUser?.displayName }</Text>
          <Text style={styles.email}>{ authy.currentUser?.email }</Text>
        </View>
        <View style={styles.menuContainer}>
          <MenuTab
            title="Search History"
            icon={icons.history}
            onPress={() => router.navigate('/profile/history')}
            containerStyle={{borderTopWidth: 1, borderColor: "#D1CFD5"}}
          />
          <MenuTab
            title="Wishlist"
            icon={icons.wishlist}
            onPress={() => router.navigate('/wishlist')}
          />
          <MenuTab
            title="Log out"
            icon={icons.logout}
            onPress={signOut}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaContainer :{
    width: "100%",
    height: "100%",
    backgroundColor: '#FBEAEB',
    justifyContent: "center",
    alignItems: "center",
  },
  container:{
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  userContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 33,
  },
  image: {
    width: 80,
    height: 80,
  },
  userName: {
    fontFamily: "semiBold",
    fontSize: 20,
    marginTop: 10,
  },
  email: {
    fontFamily: "regular",
    fontSize: 18,
  },
  menuContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
})