import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {

    apiKey: "AIzaSyBxPzo38Vcco7lTJ5_f17WtQNBWcIE5yYw",
  
    authDomain: "crwn-clothing-db-b6d07.firebaseapp.com",
  
    projectId: "crwn-clothing-db-b6d07",
  
    storageBucket: "crwn-clothing-db-b6d07.appspot.com",
  
    messagingSenderId: "822578153908",
  
    appId: "1:822578153908:web:4ed9f51afe529ea2144ae1"
  
  };
  
  
  // Initialize Firebase
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

   export const auth = getAuth();
   export const signInWithGooglePopup = () => signInWithPopup(auth, provider);