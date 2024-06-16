import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRAGA4Y7XGP8KJT48FPd1CdasexWmYVMA",
  authDomain: "snapshop-9981c.firebaseapp.com",
  projectId: "snapshop-9981c",
  storageBucket: "snapshop-9981c.appspot.com",
  messagingSenderId: "319612752769",
  appId: "1:319612752769:web:e6120b347a0b52be250e80"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }