// ⚠️  Substitua pelos seus dados do Firebase Console
// Acesse: https://console.firebase.google.com → Seu projeto → Configurações → Seus apps

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAlhZkaocwNsENTNklwKS9tu5ePTJTqFs8",
  authDomain: "floricultura-3f611.firebaseapp.com",
  projectId: "floricultura-3f611",
  storageBucket: "floricultura-3f611.firebasestorage.app",
  messagingSenderId: "917944632320",
  appId: "1:917944632320:web:71cb84e00ca66e52de44e5",
  measurementId: "G-QSWNS1YD76"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)
export default app
