import { router } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { Text, StyleSheet, View } from 'react-native';
import Button from '../components/Button';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={['#F71199', '#FCEBF5']}
        style={styles.headerContainer}
        locations={[0.5, 0.8]}
      >
        <Text style={{fontSize:80, fontWeight: 'bold', color: 'white'}}>SnapShop</Text>
      </LinearGradient>
    
      <View style={styles.footerContainer}>
        <Button title="Log In" onPress={() => router.navigate('/login')}></Button>
        <Button title="Sign Up" onPress={() => router.navigate('/signup')}></Button>
      </View>
      <View style={styles.filler} />
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
    flex: 2 ,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F71199",
    width: '100%',

  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  filler: {
    width: 200,
    height: 200,
    marginTop: 50,
  },
});