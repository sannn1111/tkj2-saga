// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBAKQUKRxCUE3YUAKll14uIU92RqPZ226o",
  authDomain: "web-kelas-77ffd.firebaseapp.com",
  projectId: "web-kelas-77ffd",
  storageBucket: "web-kelas-77ffd.appspot.com",
  messagingSenderId: "644339605554",
  appId: "1:644339605554:web:28611c6100d4c86e355c2b",
  measurementId: "G-NLWMQ02YJN"


};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();