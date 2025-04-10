
// Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDe_BOvANr00WUXq0J00kP_LJMMQs65Qh8",
  authDomain: "masjid-finder-app.firebaseapp.com",
  projectId: "masjid-finder-app",
  storageBucket: "masjid-finder-app.appspot.com",
  messagingSenderId: "631242261232",
  appId: "1:631242261232:web:e8a3e7b98e9e9e9e9e9e9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
