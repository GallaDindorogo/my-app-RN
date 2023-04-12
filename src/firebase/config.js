import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpQeHh_t6kW9Zpi1LSyxq17Yfj1ndtc8w",
  authDomain: "react-native-project-e0b2b.firebaseapp.com",
  projectId: "react-native-project-e0b2b",
  storageBucket: "react-native-project-e0b2b.appspot.com",
  messagingSenderId: "553860334487",
  appId: "1:553860334487:web:ee966eaa09a63156413ad2",
  measurementId: "G-5Y8NKM29HD",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
