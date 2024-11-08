import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDqQqR0fM9dOBZwSB5yGtziBzK55q-Ql2U",
  authDomain: "brightsmile-8fa53.firebaseapp.com",
  projectId: "brightsmile-8fa53",
  storageBucket: "brightsmile-8fa53.firebasestorage.app",
  messagingSenderId: "133615874319",
  appId: "1:133615874319:web:592d5879845f8059340e7a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;