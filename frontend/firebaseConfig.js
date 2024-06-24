import { initializeApp, getApps } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
//@ts-ignore
import { getReactNativePersistence } from '@firebase/auth/dist/rn/index.js';


const firebaseConfig = {
  apiKey: "AIzaSyDRAGA4Y7XGP8KJT48FPd1CdasexWmYVMA",
  authDomain: "snapshop-9981c.firebaseapp.com",
  projectId: "snapshop-9981c",
  storageBucket: "snapshop-9981c.appspot.com",
  messagingSenderId: "319612752769",
  appId: "1:319612752769:web:e6120b347a0b52be250e80",
  storageBucket: "gs://snapshop-9981c.appspot.com"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
// const auth = getAuth(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);
const storage = getStorage(app)

export { auth, db, storage }