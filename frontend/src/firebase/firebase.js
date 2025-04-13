import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBj24KRQqMcgZeSjszMXBXApApjSuTCIUQ",
  authDomain: "hotel-login-13dae.firebaseapp.com",
  projectId: "hotel-login-13dae",
  storageBucket: "hotel-login-13dae.firebasestorage.app",
  messagingSenderId: "48120337387",
  appId: "1:48120337387:web:584b0ca1dd191bcb5dbfae",
  measurementId: "G-9WV0NVMYFK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };