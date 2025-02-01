// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZPkU7ouCrcznIwrKouTQp7yBBC3bi_ws",
    authDomain: "epilepsy-68281.firebaseapp.com",
    projectId: "epilepsy-68281",
    storageBucket: "epilepsy-68281.firebasestorage.app",
    messagingSenderId: "787801270010",
    appId: "1:787801270010:web:297be0bafa8615a9c24b43",
    measurementId: "G-Y4DCL87HGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);