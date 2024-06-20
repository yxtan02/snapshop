import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { auth } from '../../../firebaseConfig.js'
import { icons } from "../../../constants"
import MenuTab from '../../../components/MenuTab'

export default function profile() {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Text style={styles.header}>Profile</Text>
      <View style={styles.userContainer}>
        <Image
          source={icons.profile}
          style={styles.image}
        />
        <Text style={styles.userName}>{auth.currentUser?.displayName}</Text>
        <Text style={styles.email}>{auth.currentUser?.email}</Text>
      </View>
      <View style={styles.menuContainer}>
        <MenuTab
          title="Search History"
          icon={icons.history}
          onPress={() => router.navigate('/profile/history')}
        />
        <MenuTab
          title="Wishlist"
          icon={icons.wishlist}
          onPress={() => router.navigate('/wishlist')}
        />
        <MenuTab
          title="Log out"
          icon={icons.logout}
          onPress={() => {
            auth.signOut()
            router.replace('/login')
          }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaContainer :{
    width: "100%",
    height: "100%",
    backgroundColor: '#FBEAEB',
    alignItems: "center",
    marginTop: 10,
  },
  header: {
    fontFamily: "semiBold",
    fontSize: 24,
    margin: 16,
  },
  userContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  userName: {
    fontFamily: "semiBold",
    marginTop: 10,
  },
  email: {
    fontFamily: "regular"
  },
  menuContainer: {
    marginTop: 30,
  },
})