import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlhZkaocwNsENTNklwKS9tu5ePTJTqFs8",
  authDomain: "floricultura-3f611.firebaseapp.com",
  projectId: "floricultura-3f611",
  storageBucket: "floricultura-3f611.firebasestorage.app",
  messagingSenderId: "917944632320",
  appId: "1:917944632320:web:71cb84e00ca66e52de44e5",
  measurementId: "G-QSWNS1YD76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)
export default app